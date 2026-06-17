import Link from "next/link";

type HeaderProps = {
  userEmail: string | null;
  isAdmin: boolean;
};

export function Header({ userEmail, isAdmin }: HeaderProps) {
  return (
    <header className="topbar">
      <Link className="logo" href="/">
        🏃 Marathon Skills
      </Link>
      <nav>
        <Link href="/">Главная</Link>
        <Link href="/participants">Участники</Link>
        <Link href="/results">Результаты</Link>
        <Link href="/route">Маршрут</Link>
        {userEmail ? (
          <>
            <Link href="/dashboard">Кабинет</Link>
            <Link href="/api/logout">Выход</Link>
          </>
        ) : (
          <Link href="/login">Вход</Link>
        )}
        {isAdmin && <Link href="/admin">Админка</Link>}
      </nav>
    </header>
  );
}
