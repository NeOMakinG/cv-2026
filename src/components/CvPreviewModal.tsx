import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import './CvPreviewModal.css';

interface CvPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

export const CvPreviewModal = ({ open, onClose }: CvPreviewModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const animateClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(contentRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    });
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.2, ease: 'power2.in' },
      '-=0.15',
    );
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' },
    );
    gsap.fromTo(
      contentRef.current,
      { scale: 0.85, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 },
    );
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') animateClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, animateClose]);

  if (!open) return null;

  return (
    <div ref={overlayRef} className="cv-preview-overlay" onClick={animateClose}>
      <div
        ref={contentRef}
        className="cv-preview-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cv-preview-close" onClick={animateClose}>
          &times;
        </button>

        <iframe
          src="/0xm4king-cv.pdf"
          className="cv-preview-iframe"
          title="CV Preview"
        />

        <div className="cv-preview-actions">
          <a
            href="/0xm4king-cv.pdf"
            download="0xm4king-cv.pdf"
            className="cv-preview-download"
          >
            <HiOutlineDocumentDownload /> Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};
