"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/api/axios.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/dashboard.css";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", null, { withCredentials: true });
    } catch (error) {
      console.error("Erreur logout", error);
    }
    router.push("/admin/login");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/*sidebar*/}
        <div className="dashboard-sidebar">
          {/*Logo*/}
          <div className="text-center mb-4 logo-crapper">
            <Link href="/">
            <Image
              src="/assets/logo_bulle.jpg"
              alt="Ô di Sé Janzu"
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
              />
              </Link>
          </div>
          {/* Navigation - le lien actif prends la classe btn-primary, les autres btn-outline-secondary */}
          <nav className="nav flex-column gap-2">
            <Link
              href="/admin/dashboard"
              className={`btn btn-sm text-start ${isActive("/admin/dashboard") ? "btn-primary" : "btn-outline-secondary"}`}
            >
              Accueil
            </Link>
            <Link
              href="/admin/dashboard/avis"
              className={`sidebar-btn ${isActive("/admin/dashboard/avis") ? "active" : "inactive"}`}
            >
              Avis
            </Link>
            <Link
              href="/admin/dashboard/galerie"
              className={`btn btn-sm text-start ${isActive("/admin/dashboard/galerie") ? "btn-primary" : "btn-outline-secondary"}`}
            >
              Galerie
            </Link>
            <Link
              href="/admin/dashboard/stats"
              className={`btn btn-sm text-start ${isActive("/admin/dashboard/stats") ? "btn-primary" : "btn-outline-secondary"}`}
            >
              Statistiques
            </Link>
            <Link
              href="/admin/dashboard/parametres"
              className={`btn btn-sm text-start ${isActive("/admin/dashboard/parametres") ? "btn-primary" : "btn-outline-secondary"}`}
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

        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
