// StudentDemoWithSubmitAndFeedback.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './StudentDemo.css';

export default function Studentdemo() {
  const location = useLocation();
  const navigate = useNavigate();
  const studentId = location.state?.studentId || null;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const streamRef = useRef(null);

  // monitoring / UI state
  const [showStartModal, setShowStartModal] = useState(true);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCameraErrorModal, setShowCameraErrorModal] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState(null);

  // exam / questions state
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // motion & violation
  const [motionLog, setMotionLog] = useState([]);
  const tabSwitchCountRef = useRef(0);
  const violatedRef = useRef(false);

  // submission & result
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // thank-you & feedback modal
  const [showThanksModal, setShowThanksModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0); // 1..5
  const [feedbackComment, setFeedbackComment] = useState('');
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  // ---------- helpers ----------
  const requestFullScreen = async () => {
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) await el.mozRequestFullScreen();
    } catch (err) {
      console.warn('Fullscreen request failed', err);
    }
  };

  const exitFullScreen = async () => {
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) await document.exitFullscreen();
      }
    } catch (e) { /* ignore */ }
  };

  const stopCamera = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsMonitoring(false);
  };

  const fetchQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const res = await fetch('https://talent-backend-i83x.onrender.com/api/demotest');
      const json = await res.json();
      if (json.success) {
        // ensure questions have type and correct_answer fields (backend should return them)
        setQuestions(json.questions || []);
        setCurrentIndex(0);
      } else {
        setError(json.message || 'Failed to load questions');
      }
    } catch (err) {
      console.error('fetchQuestions error', err);
      setError('Failed to load questions');
    } finally {
      setLoadingQuestions(false);
    }
  };

  // ---------- camera + monitoring ----------
  const startCameraAndMonitor = async () => {
    try {
      await requestFullScreen();
      const constraints = { video: { width: 320, height: 240 }, audio: false };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsMonitoring(true);

      const canvas = canvasRef.current;
      canvas.width = 160;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');

      let prevData = null;
      let lastTime = performance.now();
      const interval = 250;

      function step(now) {
        if (!isMonitoring) {
          rafRef.current = requestAnimationFrame(step);
          return;
        }
        if (now - lastTime >= interval) {
          try {
            if (videoRef.current && videoRef.current.readyState >= 2) {
              ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
              const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
              if (prevData) {
                let diff = 0;
                for (let i = 0; i < frame.data.length; i += 4) {
                  const gray = 0.299 * frame.data[i] + 0.587 * frame.data[i + 1] + 0.114 * frame.data[i + 2];
                  const pgray = 0.299 * prevData[i] + 0.587 * prevData[i + 1] + 0.114 * prevData[i + 2];
                  diff += Math.abs(gray - pgray);
                }
                const avg = diff / (frame.data.length / 4);
                const THRESH = 18;
                if (avg > THRESH) {
                  setMotionLog(prev => {
                    const next = [...prev, { t: Date.now(), diff: Math.round(avg) }];
                    if (next.length > 500) next.shift();
                    return next;
                  });
                }
              }
              prevData = frame.data.slice(0);
            }
          } catch (err) {
            console.error('Frame error', err);
          }
          lastTime = now;
        }
        rafRef.current = requestAnimationFrame(step);
      }

      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    } catch (err) {
      console.error('Camera error', err);
      setError('Camera permission denied or not available.');
      setShowCameraErrorModal(true);
      setIsMonitoring(false);
    }
  };

  // ---------- event handling ----------
  const handleViolationOccurrence = (reason) => {
    if (violatedRef.current) return;
    tabSwitchCountRef.current += 1;
    setMotionLog(prev => {
      const next = [...prev, { t: Date.now(), reason }];
      if (next.length > 500) next.shift();
      return next;
    });

    if (tabSwitchCountRef.current === 1) {
      setShowWarningModal(true);
      setIsMonitoring(false); // pause monitoring so events don't flood
    } else {
      violatedRef.current = true;
      setShowCancelModal(true);
      stopCamera();
      // ensure exit fullscreen and navigate after a short pause
      setTimeout(async () => {
        await exitFullScreen();
        navigate('/', { replace: true });
      }, 1500);
    }
  };

  const onVisibilityChange = () => { if (document.hidden) handleViolationOccurrence('visibility-hidden'); };
  const onBlur = () => handleViolationOccurrence('window-blur');
  const onFullscreenChange = () => { if (!document.fullscreenElement) handleViolationOccurrence('fullscreen-exit'); };
  const onBeforeUnload = (e) => { handleViolationOccurrence('beforeunload'); e.preventDefault(); e.returnValue = ''; return ''; };

  useEffect(() => {
    if (isMonitoring) {
      document.addEventListener('visibilitychange', onVisibilityChange);
      window.addEventListener('blur', onBlur);
      document.addEventListener('fullscreenchange', onFullscreenChange);
      window.addEventListener('beforeunload', onBeforeUnload);
    }
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMonitoring]);

  // ---------- UI handlers ----------
  const handleStartClick = async () => {
    setShowStartModal(false);
    await startCameraAndMonitor();
    fetchQuestions();
  };

  const closeWarningModal = async () => {
    setShowWarningModal(false);
    try { await requestFullScreen(); } catch (e) {}
    setIsMonitoring(true);
  };

  const retryCamera = async () => {
    setShowCameraErrorModal(false);
    setError(null);
    await startCameraAndMonitor();
    fetchQuestions();
  };

  const selectAnswer = (qid, opt) => setAnswers(prev => ({ ...prev, [qid]: opt }));

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else await handleSubmit();
  };

  const handleBack = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };

  // ---------- Submit (calculate score/total and save) ----------
  const handleSubmit = async () => {
    if (!questions.length) return;
    setSubmitting(true);

    // compute score and total based on current questions & answers
    let score = 0;
    let total = 0;

    // Build answers payload for backend too
    const payloadAnswers = questions.map(q => {
      const sel = answers[q.id] || null;
      const qtype = (q.type || 'mcq').toLowerCase();
      const maxMarks = qtype === 'descriptive' ? 5 : 2;
      total += maxMarks;

      // auto-grade MCQs only if correct_answer present
      if (qtype === 'mcq' && q.correct_answer != null) {
        // compare case-insensitive trimmed
        if (String(sel || '').trim().toUpperCase() === String(q.correct_answer || '').trim().toUpperCase()) {
          score += 2;
        }
      }

      return {
        questionId: q.id,
        selected: sel,
        type: qtype,
        maxMarks,
        correct_answer: q.correct_answer ?? null
      };
    });

    const payload = {
      duration_seconds: Math.round((motionLog.length * 0.25) || 0),
      canceled: violatedRef.current || false,
      answers: payloadAnswers,
      motionLog,
      score,
      total
    };

    try {
      const res = await fetch('https://talent-backend-i83x.onrender.com/api/demo-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        // prefer server-provided values if present, otherwise use our computed ones
        const finalScore = (typeof json.score === 'number') ? json.score : score;
        const finalTotal = (typeof json.total === 'number') ? json.total : total;

        setResult({ score: finalScore, total: finalTotal, examId: json.examId || null });
        setShowThanksModal(true);
        stopCamera();
      } else {
        setError(json.message || 'Submit failed');
      }
    } catch (err) {
      console.error('Submit error', err);
      setError('Submit failed');
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Feedback submission (unchanged) ----------
  const submitFeedback = async () => {
    if (feedbackRating < 1) {
      alert('Please choose a rating (1–5 stars) or click Skip.');
      return;
    }
    setSendingFeedback(true);
    try {
      const payload = {
        studentId: studentId || null,
        examId: result?.examId || null,
        rating: feedbackRating,
        comment: feedbackComment
      };
      const res = await fetch('/api/demo/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        setFeedbackSent(true);
      } else {
        alert(json.message || 'Failed to send feedback');
      }
    } catch (err) {
      console.error('Feedback error', err);
      alert('Failed to send feedback');
    } finally {
      setSendingFeedback(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  // When user clicks Go to Home from thank-you modal, ensure fullscreen exit then navigate:
  const goHomeFromThanks = async () => {
    try {
      stopCamera();
      await exitFullScreen();
    } catch (e) { /* ignore */ }
    setShowThanksModal(false);
    navigate('/', { replace: true });
  };

  // ---------- render ----------
  if (result && !showThanksModal) {
    return (
      <div className="sd-container">
        <div className="sd-result-card">
          <h2>Result</h2>
          <p className="sd-score">{result.score} / {result.total}</p>
          <p>Motion events detected: {motionLog.length}</p>
          <Button variant="secondary" onClick={async () => { await exitFullScreen(); navigate('/', { replace: true }); }}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="sd-container">
      {/* Start modal */}
      <Modal show={showStartModal} backdrop="static" keyboard={false} centered>
        <Modal.Header><Modal.Title>Enable Camera & Fullscreen</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>We will open your camera and request fullscreen. Please allow camera access and remain in this tab during the exam.</p>
          <p><strong>Note:</strong> switching tabs or exiting fullscreen will produce a warning; the second time will cancel your exam.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleStartClick}>Open Camera & Start</Button>
        </Modal.Footer>
      </Modal>

      {/* Camera error modal */}
      <Modal show={showCameraErrorModal} backdrop="static" keyboard={false} centered>
        <Modal.Header><Modal.Title>Camera Required — AI Proctoring</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>This exam uses <strong>AI-based proctoring</strong>. You must enable camera access and keep the exam tab active. If you do not allow camera access or switch tabs, your exam may be terminated.</p>
          <p>If your camera is blocked or not detected, please allow camera permissions in your browser or try another device.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowCameraErrorModal(false); navigate('/', { replace: true }); }}>
            Cancel & Go Home
          </Button>
          <Button variant="primary" onClick={retryCamera}>Retry Camera</Button>
        </Modal.Footer>
      </Modal>

      {/* Warning modal */}
      <Modal show={showWarningModal} onHide={closeWarningModal} centered>
        <Modal.Header closeButton><Modal.Title>Warning — Do not switch tabs</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>We detected a tab switch/blur. This is your <strong>first warning</strong>. If you switch again, your exam will be cancelled.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeWarningModal}>Continue Exam</Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel modal */}
      <Modal show={showCancelModal} backdrop="static" keyboard={false} centered>
        <Modal.Header><Modal.Title>Exam Cancelled</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>Your exam was cancelled because you switched tabs / exited fullscreen again.</p>
          <p>You will be redirected to the home page.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={async () => { await exitFullScreen(); navigate('/', { replace: true }); }}>Go Home Now</Button>
        </Modal.Footer>
      </Modal>

      {/* Thank-you + feedback modal */}
      <Modal show={showThanksModal} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Thank you for your submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you — your exam has been submitted. Your result will be emailed to you within 24 hours. Keep in touch.</p>
          <hr />
          <h5>H1: Exam kaisa laga?</h5>
          <div style={{ fontSize: 28 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                onClick={() => setFeedbackRating(s)}
                style={{ cursor: 'pointer', marginRight: 8, color: s <= feedbackRating ? '#f5b301' : '#bbb' }}
                aria-label={`${s} star`}
              >
                ★
              </span>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <textarea
              placeholder="Optional feedback (what went well / what to improve)"
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              rows={4}
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>
          {feedbackSent && <div style={{ marginTop: 8, color: 'green' }}>Thank you — your feedback was sent.</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={goHomeFromThanks}>Go to Home</Button>
        </Modal.Footer>
      </Modal>

      {/* Main UI */}
      <div className="sd-grid">
        <div className="sd-camera-panel">
          <video ref={videoRef} width={320} height={240} autoPlay muted playsInline className={isMonitoring ? 'sd-video-on' : 'sd-video-off'} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div className="sd-monitor-info">
            <div>Monitoring: <strong>{isMonitoring ? 'ON' : 'OFF'}</strong></div>
            <div>Motion events: <strong>{motionLog.length}</strong></div>
            {error && <div className="sd-error">{error}</div>}
          </div>
        </div>

        <div className="sd-questions-panel">
          <div className="sd-questions-header">
            <h3>Demo Test</h3>
            <div className="sd-progress">
              {questions.length > 0 ? <span>Question {currentIndex + 1} / {questions.length}</span> : <span>Question 0 / 0</span>}
            </div>
          </div>

          {loadingQuestions && <div className="sd-loading">Loading questions…</div>}

          {!loadingQuestions && currentQuestion ? (
            <div className="sd-question-card sd-single-question">
              {/* show marks for question */}
              <div className="sd-question-text">
                <span className="sd-qno">{currentIndex + 1}.</span> {currentQuestion.question}
                <small style={{ marginLeft: 8, color: '#666' }}>
                  ({(currentQuestion.type && currentQuestion.type.toLowerCase() === 'descriptive') ? '5 marks' : '2 marks'})
                </small>
              </div>

              <div className="sd-options">
                {[
                  ['A', currentQuestion.option_a],
                  ['B', currentQuestion.option_b],
                  ['C', currentQuestion.option_c],
                  ['D', currentQuestion.option_d]
                ].map(([opt, text]) => (
                  text ? (
                    <label key={opt} className="sd-option">
                      <input
                        type="radio"
                        name={`q${currentQuestion.id}`}
                        checked={answers[currentQuestion.id] === opt}
                        onChange={() => selectAnswer(currentQuestion.id, opt)}
                      />{' '}
                      <span className="sd-opt-letter">{opt}.</span> <span className="sd-opt-text">{text}</span>
                    </label>
                  ) : null
                ))}
                {/* For descriptive, show a textarea */}
                {(currentQuestion.type && currentQuestion.type.toLowerCase() === 'descriptive') && (
                  <div style={{ marginTop: 8 }}>
                    <textarea
                      placeholder="Write your answer..."
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => selectAnswer(currentQuestion.id, e.target.value)}
                      rows={5}
                      style={{ width: '100%', resize: 'vertical' }}
                    />
                  </div>
                )}
              </div>

              <div className="sd-nav-buttons">
                <button className="btn btn-outline-secondary" onClick={handleBack} disabled={currentIndex === 0}>Back</button>
                <div style={{ flex: 1 }} />
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={submitting || violatedRef.current}
                >
                  {currentIndex === questions.length - 1 ? (submitting ? 'Submitting...' : 'Submit') : 'Next'}
                </button>
              </div>
            </div>
          ) : (
            !loadingQuestions && <div className="sd-no-questions">No questions available. Click "Open Camera & Start".</div>
          )}
        </div>
      </div>
    </div>
  );
}
