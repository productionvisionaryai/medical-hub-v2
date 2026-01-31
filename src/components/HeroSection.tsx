import React from 'react';

export interface Doctor {
  id: string;
  nombre: string;
  slug: string;
  especialidad: string;
  titulo?: string;
  bio?: string;
  imagenUrl?: string;
  email?: string;
  telefono?: string;
  ubicacion?: string;
  calendlyUrl?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  tono?: string; // Personalidad del asistente: 'Cálido y protector', 'Profesional y técnico', etc.
  createdAt?: Date;
  updatedAt?: Date;
}

interface HeroSectionProps {
  doctor: Doctor;
}

export default function HeroSection({ doctor }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          {doctor.imagenUrl && (
            <img
              src={doctor.imagenUrl}
              alt={`Dr. ${doctor.nombre}`}
              className="hero-image"
            />
          )}
          <h1>Dr. {doctor.nombre}</h1>
          {doctor.titulo && <p className="hero-title">{doctor.titulo}</p>}
          <p className="hero-specialty">{doctor.especialidad}</p>
          {doctor.bio && <p className="hero-bio">{doctor.bio}</p>}
          {doctor.ubicacion && (
            <p className="hero-location">
              <span>📍</span> {doctor.ubicacion}
            </p>
          )}
          <div className="hero-social-links">
            {doctor.calendlyUrl && (
              <a href={doctor.calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-calendly">
                Agendar Cita
              </a>
            )}
            {doctor.websiteUrl && (
              <a href={doctor.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-website">
                Website
              </a>
            )}
            {doctor.linkedinUrl && (
              <a href={doctor.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                LinkedIn
              </a>
            )}
            {doctor.email && (
              <a href={`mailto:${doctor.email}`} className="social-link">
                Email
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
