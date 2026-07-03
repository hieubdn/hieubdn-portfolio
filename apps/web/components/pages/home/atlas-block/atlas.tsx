import Image from "next/image";
import mapImage from '@/assets/image/contact-info/img-map.webp';
import IconMap from '@/assets/image/contact-info/icon-map.svg';
import styles from './atlas.module.scss';
import { StarIcon } from '@/assets/svg';

const Atlas = () => {
    return (
        <div className={styles.root}>
                <div className={styles.mapImage}>
                    <Image src={mapImage} alt="map" className={styles.mapImg} />
                </div>
                <div className={styles.starIcon}> <StarIcon /></div>
                <div className={styles.infoImageItem}>
                    <Image src={IconMap} alt="icon-map" />
                    <span>Đà Nẵng</span>
                </div>
                <div className={styles.hoangSa}>QĐ Hoàng Sa</div>
                <div className={styles.truongSa}>QĐ Trường Sa</div>
        </div>
    );
};

export default Atlas;