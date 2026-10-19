import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Minha Loja - E-commerce',
  description: 'A melhor plataforma de vendas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
