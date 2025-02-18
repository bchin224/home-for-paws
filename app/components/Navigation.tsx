"use server";
import Link from "next/link";

export default async function Navigation() {
  const navLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/">Search</Link>
      </li>
      <li>
        <Link href="/">Account</Link>
      </li>
    </>
  );
  return (
    <header className="items-center justify-items-center">
      <Link href="/" className="btn btn-link text-xl">
        Home For Paws
      </Link>
      <div className="nav-bar">{navLinks}</div>
    </header>
  );
}
