const Footer = () => {
  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-auto mx-auto px-10 py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Exclusive</h3>
            <p className="mb-4 text-sm">Subscribe</p>
            <p className="mb-6 text-sm text-gray-400">
              Get 10% off your first order
            </p>

            <div className="flex items-center border border-gray-500 rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-3 text-sm flex-1 outline-none"
              />
              <button className="px-4">
                ➤
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Account</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Link</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Download App</h3>
            <p className="text-sm text-gray-400 mb-4">
              Save $3 with App New User Only
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white" /> {/* QR Placeholder */}
              <div className="space-y-2">
                <button className="border px-4 py-2 text-xs rounded">
                  Google Play
                </button>
                <button className="border px-4 py-2 text-xs rounded">
                  App Store
                </button>
              </div>
            </div>

            <div className="flex gap-4 text-xl">
              <span>f</span>
              <span>𝕏</span>
              <span>📷</span>
              <span>in</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-6 text-center text-sm text-gray-500">
          © Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
