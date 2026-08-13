import Image from "next/image";
import mapImage from '@/assets/image/contact-info/img-map.webp';
import IconMap from '@/assets/image/contact-info/icon-map.svg';
import styles from './atlas.module.scss';
import { StarIcon } from '@/assets/svg';
import { Reveal } from '@/components/ui/reveal';

const Atlas = () => {
    return (
        <div className={styles.root}>
                <Reveal as="div" variant="scale" className={styles.mapImage}>
                    <Image src={mapImage} alt="map" className={styles.mapImg} />
                </Reveal>
                <Reveal as="div" delayMs={120} className={styles.starIcon}> <StarIcon /></Reveal>
                <Reveal as="div" delayMs={180} className={styles.infoImageItem}>
                    <Image src={IconMap} alt="icon-map" />
                    <Reveal as="span" delayMs={200}>Đà Nẵng</Reveal>
                </Reveal>
                <Reveal as="div" delayMs={240} className={styles.hoangSa}>QĐ Hoàng Sa</Reveal>
                <Reveal as="div" delayMs={300} className={styles.truongSa}>QĐ Trường Sa</Reveal>
        </div>
    );
};

export default Atlas;