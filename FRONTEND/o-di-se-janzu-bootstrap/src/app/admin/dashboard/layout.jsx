"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/api/axios.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/dashboard.css";
import "@/styles/dashboard.mobile.css";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  // état du menu burger
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", null, { withCredentials: true });
    } catch (error) {
      console.error("Erreur logout", error);
    }
    // supprime le cookie session 
    document.cookie= 'session=; path=/; max-age=0; SameSite=Lax; Secure'
    router.push("/admin/login");
  };

  // ferme le menu après un clic sur un lien
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/*Header mobile visible que sur mobile - css cahé */}
        <div className="dashboard-mobile-header">
          <Link href="/">
            <img
              src="/assets/logo_bulle.jpg"
              alt="Logo"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
          </Link>
          <span style={{ fontWeight: 600, fontSize: "1rem", color: "#2d3748" }}>
            Ô di Sé Janzu — Admin
          </span>
          <button
            className="dashboard-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} />
          </button>
        </div>

        {/*sidebar*/}
        <div className={`dashboard-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
          {/*Logo*/}
          <div className="text-center mb-4 logo-crapper">
            <Link href="/">
              <img
                src="/assets/logo_bulle.jpg"
                alt="Ô di Sé Janzu"
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
                onClick={handleNavClick}
              />
            </Link>
          </div>
          {/* Navigation - le lien actif prends la classe btn-primary, les autres btn-outline-secondary */}
          <nav className="nav flex-column gap-2">
            <Link
              href="/admin/dashboard"
              className={`btn btn-sm text-start ${isActive("/admin/dashboard") ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={handleNavClick}
            >
              Accueil
            </Link>
            <Link
              href="/admin/dashboard/avis"
              className={`btn btn-sm text-start ${isActive("/admin/dashboard/avis") ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={handleNavClick}
            >
              Avis
            </Link>
            <Link
              href="/admin/dashboard/galerie"
              className={`btn btn-sm text-start ${isActive("/admin/dashboard/galerie") ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={handleNavClick}
            >
              Galerie
            </Link>
            <Link
              href="/admin/dashboard/stats"
              className={`btn btn-sm text-start ${isActive("/admin/dashboard/stats") ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={handleNavClick}
            >
              Statistiques
            </Link>
            <Link
              href="/admin/dashboard/parametres"
              className={`btn btn-sm text-start ${isActive("/admin/dashboard/parametres") ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={handleNavClick}
            >
              Paramètres
            </Link>
          </nav>

          {/*Bouton déconnexion épignlé en bas de la sidebar */}
          <div className="sidebar-logout">
            <button
              className="btn btn-sm btn-danger w-100"
              onClick={handleLogout}
            >
              déconnexion
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />
        )}
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
