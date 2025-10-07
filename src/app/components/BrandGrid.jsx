"use client";

import { useState, useEffect } from 'react';
import styles from './BrandGrid.module.css';

const API_URL = 'http://localhost:3001/api';

const BrandGrid = ({ navigateTo }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/cars`)
      .then(res => {
        if (!res.ok) throw new Error('API não disponível');
        return res.json();
      })
      .then(data => {
        const brandMap = {};
        data.forEach(car => {
          if (car.brand && !brandMap[car.brand]) {
            brandMap[car.brand] = {
              name: car.brand,
              logo: `/logos/${car.brand.toLowerCase()}.png`,
              description: 'Performance e qualidade',
              carImage: car.images && car.images.length > 0 ? car.images[0] : null,
              carModel: car.model || car.name
            };
          }
        });
        setBrands(Object.values(brandMap));
      })
      .catch(err => {
        console.error('Erro ao carregar carros:', err);
        setBrands([]);
      })
      .finally(() => setLoading(false));
  }, []);
  const defaultBrands = [
    { name: 'Volkswagen', logo: '/logos/volks.png', description: 'Tradição alemã em engenharia' },
    { name: 'BMW', logo: '/logos/BMW.png', description: 'Prazer em dirigir' },
    { name: 'Ford', logo: '/logos/Ford.png', description: 'Inovação americana' },
    { name: 'Hyundai', logo: '/logos/hyundai.png', description: 'Tecnologia sul-coreana' },
    { name: 'Toyota', logo: '/logos/toyot.png', description: 'Confiabilidade japonesa' },
    { name: 'Mitsubishi', logo: '/logos/mitsubishi.svg', description: 'Performance e durabilidade' },
    { name: 'Chevrolet', logo: '/logos/chevrolet.png', description: 'Força americana' },
    { name: 'Honda', logo: '/logos/honda.webp', description: 'Engenharia japonesa premium' },
    { name: 'Mercedes', logo: '/logos/mercedes.png', description: 'Luxo alemão incomparável' },
    { name: 'Audi', logo: '/logos/audi.png', description: 'Vorsprung durch Technik' },
    { name: 'Dodge', logo: '/logos/dodge.png', description: 'Muscle cars americanos' },
    { name: 'Renault', logo: '/logos/renault.png', description: 'Elegância francesa' },
    { name: 'Subaru', logo: '/logos/subaru.png', description: 'Confiança e aventura' },
    { name: 'Mazda', logo: '/logos/mazda.png', description: 'Zoom-Zoom japonês' },
    { name: 'Porsche', logo: '/logos/porsche.svg', description: 'Ícone alemão de performance' }
  ];

  const brandsToShow = brands && brands.length > 0 ? brands : defaultBrands;

  const handleBrandClick = (brandName) => {
    console.log('🎯 Marca clicada:', brandName, '| Tipo:', typeof brandName);
    if (!brandName) {
      console.error('❌ brandName está vazio ou undefined!');
      return;
    }
    if (navigateTo) {
      navigateTo('carList', { brand: brandName });
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingGrid}>
        {[...Array(15)].map((_, index) => (
          <div key={index} className={styles.brandCardSkeleton}>
            <div className={styles.skeletonIcon}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonDesc}></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={styles.brandsGrid}>
        {brandsToShow.map((brand, index) => (
          <div 
            key={brand.name || index}
            className={styles.brandCard} 
            onClick={() => handleBrandClick(brand.name)}
          >
            <div className={styles.brandIcon}>
              <img 
                src={brand.logo} 
                alt={`${brand.name} Logo`} 
                className={styles.brandLogo}
                onError={(e) => {
                  e.target.src = '/images/car-placeholder.svg';
                }}
              />
            </div>
            <h3 className={styles.brandName}>{brand.name}</h3>
            <p className={styles.brandDesc}>
              {brand.description || 'Performance e qualidade'}
            </p>
            
            {brand.carImage && (
              <div className={styles.carImageContainer}>
                <img 
                  src={brand.carImage} 
                  alt={`${brand.carModel}`}
                  className={styles.carImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className={styles.brandArrow}>→</div>
            
            {brand.carCount && (
              <div className={styles.carCount}>
                {brand.carCount} modelo{brand.carCount !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BrandGrid;
