
// src/pages/GalleryPage/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import styles from './GalleryPage.module.css';
import Modal from '../../components/Modal/Modal';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await apiService.get('/photos');
        setPhotos(response.data);
      } catch {
        setError('Falha ao buscar as fotos.');
      }
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Carregando galeria...</p>
    </div>
  );
  
  if (error) return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{error}</p>
    </div>
  );

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHeader}>
        <h1>Galeria de Fotos ASFUS</h1>
        <p>Momentos especiais e memórias da nossa comunidade</p>
      </div>
      
      {photos.length === 0 ? (
        <div className={styles.emptyGallery}>
          <span className={styles.emptyIcon}>📷</span>
          <h3>Galeria Vazia</h3>
          <p>Ainda não há fotos na galeria. Volte em breve!</p>
        </div>
      ) : (
        <div className={styles.photoGrid}>
          {photos.map(photo => (
            <div key={photo.id} className={styles.photoCard} onClick={() => openModal(photo)}>
              <div className={styles.photoImage}>
                <img src={photo.imageUrl} alt={photo.caption || 'Foto ASFUS'} />
                <div className={styles.photoOverlay}>
                  <span className={styles.viewIcon}>👁️</span>
                </div>
              </div>
              {photo.caption && (
                <div className={styles.photoCaption}>
                  <p>{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedPhoto && (
        <Modal onClose={closeModal}>
          <div className={styles.modalContent}>
            <img 
              src={selectedPhoto.imageUrl} 
              alt={selectedPhoto.caption || 'Foto ASFUS'} 
              className={styles.modalImage}
            />
            {selectedPhoto.caption && (
              <div className={styles.modalCaption}>
                <h3>{selectedPhoto.caption}</h3>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GalleryPage;
