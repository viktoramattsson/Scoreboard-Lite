import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div>
        <h1>Scoreboard Lite</h1>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/playRounds">Play Rounds</Link>
          </li>
          <li>
            <Link href="/">About Us</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
