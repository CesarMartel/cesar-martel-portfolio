import "./globals.css";
import Aurora from "../components/Aurora/Aurora";

export const metadata = {
  title: "César Martel | Portfolio",
  description: "Backend Developer — Python & APIs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased bg-black text-white relative min-h-screen overflow-x-hidden selection:bg-purple-500/30">
        
        {/* Global Aurora Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Aurora 
            colorStops={["#3A29FF", "#7CFF67", "#FF94B4"]} 
            amplitude={1.0} 
            speed={0.5} 
          />
        </div>

        {/* Global Overlay for readability */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)",
            backdropFilter: "blur(2px)" // Increased blur for better text contrast
          }}
        />

        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
        
      </body>
    </html>
  );
}
