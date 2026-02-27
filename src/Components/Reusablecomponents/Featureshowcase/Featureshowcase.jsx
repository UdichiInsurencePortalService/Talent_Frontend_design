import React from "react";
// import { Clock, Target, MessageSquare, Users } from "lucide-react";
import { Clock, Target, MessageSquare, Users, Wrench, Calculator, Shield, Settings, Video, Search } from "lucide-react";

import "./FeatureShowcase.css"; // custom styling

const FeatureShowcase = ({
  tagText,
  titleHighlight,
  titleNormal,
  description,
  features = [],
  imageSrc,
  imageAlt,
  imageOnLeft = false,
  ctaButton = null,
}) => {
  const iconMap = {
  clock: Clock,
  target: Target,
  message: MessageSquare,
  users: Users,
  mechanical: Wrench,
  math: Calculator,
  detail: Search,
  shield: Shield,
  settings: Settings,
  video: Video,
};


  const iconColorMap = {
    blue: "icon-blue",
    green: "icon-green",
    purple: "icon-purple",
    orange: "icon-orange",
    red: "icon-red",
    pink: "icon-pink",
    indigo: "icon-indigo",
    teal: "icon-teal",
  };

  return (
    <section className="feature-section py-4">
      <div className="container">
        <div className="row align-items-center ">
          {/* Image */}
          <div
            className={`col-lg-6 order-2 ${imageOnLeft ? "order-lg-1" : "order-lg-2"}`}
          >
            <div className="image-wrapper text-center">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`col-lg-6 order-1 ${imageOnLeft ? "order-lg-2" : "order-lg-1"}`}
          >
            {tagText && (
              <span className="badge bg-primary-subtle text-primary mb-3">
                {tagText}
              </span>
            )}

            <h2 className="fw-bold display-6">
              <span className="text-dark">{titleHighlight}</span>{" "}
              <span className="text-secondary">{titleNormal}</span>
            </h2>

            {description && (
              <p className="text-muted fs-5 mt-3">{description}</p>
            )}

            <div className="mt-4">
              {features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Users;
                const iconColorClass =
                  iconColorMap[feature.iconColor] || "icon-blue";

                return (
                  <div
                    key={index}
                    className="d-flex align-items-start mb-4 feature-item"
                  >
                    <div className={`icon-box me-3 ${iconColorClass}`}>
                      <IconComponent size={22} />
                    </div>
                    <div>
                      <h5 className="fw-semibold mb-1">{feature.title}</h5>
                      <p className="text-muted mb-0">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {ctaButton && (
              <a href={ctaButton.link} className="btn btn-primary btn-lg mt-3">
                {ctaButton.text} →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
