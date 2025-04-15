import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { selectLightMode } from '@/redux/colorSlice';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/index.css';

export default function Map() {
  const lightMode = useSelector(selectLightMode);

  const position = [25.0247, 121.5442];

  const tileUrl = lightMode
    ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
    : 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';

  
  const iconColor = lightMode ? '#DBB985' : '#B08968';

  const customIcon = L.divIcon({
    className: '',
    html: `
      <svg width="30" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(180 12 12)">
          <path fill="${iconColor}" d="M12 2C8 7 5 10.91 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 10.91 16 7 12 2Z" />
        </g>
      </svg>
    `,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });

  return (
    <div className="w-full h-[300px] mb-0 z-10" >
      <MapContainer center={position} zoom={20} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer url={tileUrl} />
        <Marker position={position} icon={customIcon}>
        <Popup>
            <a 
                href="https://www.google.com/maps?q=25.0247,121.5442" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#1E1E1E', textDecoration: 'none' }} 
            >
                點擊查看 Blissful Bites 在 Google 地圖上的位置
            </a>
        </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
