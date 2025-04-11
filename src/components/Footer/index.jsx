import './footer.css';

export default function Footer() {
  return (
    <div>
      {/* 分隔線 */}
      <hr className="my-6 w-full border-t-2 border-primary rounded-sm opacity-100" />

      <footer className="footer bg-gray-900 text-white py-6">
        {/* 描述區塊 */}
        <div className="footer-content">
          <p className="font-extrabold">DESCRIPTIONS</p>
          <p className="indent-4 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            deleniti iste sit enim. Veniam eos sequi laudantium optio, saepe
            excepturi illo autem quibusdam delectus illum ipsa? Nobis culpa
            debitis error!
          </p>
        </div>

        {/* 追蹤我們 */}
        <div className="footer-followUs">
          <p className="font-extrabold">FOLLOW US</p>
          <div className="flex items-center space-x-4">
            <a href="#">
              <img className="w-8 h-8" src="/img/fb.svg" alt="facebook" />
            </a>
            <a href="#">
              <img className="w-8 h-8" src="/img/ig.svg" alt="instagram" />
            </a>
          </div>
        </div>

        {/* 聯絡我們 */}
        <div className="footer-contactUs">
          <p className="font-extrabold">門市資訊</p>
          <p className="text-gray-300">Blissful Bites
          門市地址｜106320 臺北市大安區和平東路2段134號<br/>電話｜02-00000000<br/>營業時間｜12:30-20:30（無固定公休日）</p>
        </div>

        {/* 版權聲明 */}
        <p className="footer-copyRight text-center text-gray-400 opacity-60">
        Copyright 2025 © Blissful Bites
        </p>
      </footer>
    </div>
  );
}