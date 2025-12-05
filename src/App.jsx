import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Toaster, toast } from "sonner";
import useSound from "use-sound"; // Import Sound Hook
import RACES from "./data/races.json"; // Import JSON directly

// Define sound URLs (Local Assets)
const CLICK_SFX = "/sounds/click.mp3";
const HOVER_SFX = "/sounds/hover.mp3";

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedRace, setSelectedRace] = useState(null);
  const [nextRace, setNextRace] = useState(null);
  const [daysUntilNext, setDaysUntilNext] = useState(0);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all', 'sprint', 'upcoming'

  // Sounds
  const [playClick] = useSound(CLICK_SFX, { volume: 0.5 });
  const [playHover] = useSound(HOVER_SFX, { volume: 0.1 }); // Low volume for hover

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setLoading(false), 2500);

    // Calculate Next Race
    const now = new Date();
    const upcoming = RACES.find((race) => {
      const raceDate = new Date(race.sessions.race); // ISO format directly usable
      return raceDate >= now;
    });

    const next = upcoming || RACES[0];
    setNextRace(next);

    if (next) {
      const raceDate = new Date(next.sessions.race);
      const diff = raceDate.getTime() - now.getTime();
      setDaysUntilNext(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    // Select initial race
    setSelectedRace(next || RACES[0]);
  }, []);

  const getDaysUntil = (race) => {
    const now = new Date();
    const raceDate = new Date(race.sessions.race);
    const diff = raceDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleSelectRace = (race) => {
    try {
      playClick();
    } catch (e) {
      console.error("Sound error:", e);
    }
    setSelectedRace(race);
  };

  // Filter Logic
  const filteredRaces = RACES.filter((race) => {
    // 1. Search Filter
    const searchLower = searchTerm.toLowerCase();
    // Adjust property names for search
    // races.json uses 'location' as "City, Country" usually, or just string
    const matchesSearch =
      race.name.toLowerCase().includes(searchLower) ||
      race.circuit.toLowerCase().includes(searchLower) ||
      (race.location && race.location.toLowerCase().includes(searchLower));

    if (!matchesSearch) return false;

    // 2. Type Filter
    if (filterType === "all") return true;

    if (filterType === "sprint") {
      return race.type === "sprint"; // New property in JSON
    }

    if (filterType === "upcoming") {
      const now = new Date();
      const raceDate = new Date(race.sessions.race);
      return raceDate >= now;
    }

    return true;
  });

  const handleFilterChange = (type) => {
    try {
      playClick();
    } catch (e) {
      console.error("Sound error:", e);
    }
    setFilterType(type);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Helper to format sessions for display
  const getFormattedSessions = (race) => {
    if (!race || !race.sessions) return [];
    // Map session keys to display names
    const sessionMap = {
      fp1: { name: "Práctica 1", icon: "directions_car" },
      fp2: { name: "Práctica 2", icon: "directions_car" },
      fp3: { name: "Práctica 3", icon: "directions_car" },
      qualifying: { name: "Clasificación", icon: "timer" },
      sprintQualifying: { name: "Clasif. Sprint", icon: "bolt" },
      sprint: { name: "Sprint", icon: "bolt" },
      race: { name: "Carrera", icon: "flag" },
    };

    // Sort order
    const order = [
      "fp1",
      "fp2",
      "fp3",
      "sprintQualifying",
      "sprint",
      "qualifying",
      "race",
    ];

    return order
      .filter((key) => race.sessions[key])
      .map((key) => {
        const dateObj = new Date(race.sessions[key]);
        return {
          key,
          name: sessionMap[key].name,
          icon: sessionMap[key].icon,
          date: dateObj.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
          }),
          time: dateObj.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
  };

  return (
    <>
      <div className="background-container">
        <div className="overlay"></div>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="splash"
            className="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="splash-content"
            >
              <img
                src="/logo.png"
                alt="F1 2026"
                loading="lazy"
                className="splash-logo"
              />
              <div className="loader-line"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          key="main-app"
          className="app-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <header className="main-header">
            <div className="logo-area">
              <img
                src="/logo.png"
                alt="F1 2026 Logo"
                loading="lazy"
                className="logo-img"
              />
              <div className="title-group">
                <h1 className="app-title" style={{ display: "none" }}>
                  F1 2026
                </h1>{" "}
                {/* Hidden visually but kept for SEO if needed, replaced by logo */}
                <span className="app-subtitle">CALENDARIO OFICIAL</span>
              </div>
            </div>
            <div className="season-info-area">
              <div className="season-year">2026</div>
              <div className="total-races">24 CARRERAS</div>
            </div>
          </header>

          {/* Main Content */}
          <main className="content-grid">
            {/* Left Panel: Race List */}
            <section className="left-panel">
              <div className="panel-header">
                <span className="material-icons">format_list_bulleted</span>
                <h2>TEMPORADA</h2>
              </div>

              {/* Search & Filter Bar */}
              <div className="search-filter-bar">
                <div className="search-input-wrapper">
                  <span className="material-icons search-icon">search</span>
                  <input
                    type="text"
                    placeholder="Buscar carrera, circuito..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="filter-chips">
                  <button
                    className={`filter-chip ${
                      filterType === "all" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("all")}
                  >
                    Todas
                  </button>
                  <button
                    className={`filter-chip ${
                      filterType === "sprint" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("sprint")}
                  >
                    <span className="material-icons" style={{ fontSize: 12 }}>
                      bolt
                    </span>
                    Sprint
                  </button>
                  <button
                    className={`filter-chip ${
                      filterType === "upcoming" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("upcoming")}
                  >
                    Próximas
                  </button>
                </div>
              </div>

              <motion.div
                className="race-list"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredRaces.map((race) => {
                  const isSelected =
                    selectedRace && selectedRace.round === race.round;
                  const isNext = nextRace && nextRace.round === race.round;
                  const days = getDaysUntil(race);

                  return (
                    <Tilt
                      key={race.round}
                      tiltMaxAngleX={3}
                      tiltMaxAngleY={3}
                      perspective={1000}
                      scale={1.02}
                      transitionSpeed={1500}
                      gyroscope={true}
                      glareEnable={true}
                      glareMaxOpacity={0.15}
                      glareColor="#ffffff"
                      glarePosition="all"
                      glareBorderRadius="12px"
                      style={{ height: "100%" }}
                    >
                      <motion.div
                        variants={itemVariants}
                        layoutId={`race-card-${race.round}`}
                        className={`race-card ${isSelected ? "selected" : ""} ${
                          isNext ? "next" : ""
                        }`}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`Seleccionar ${race.name}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSelectRace(race);
                          }
                        }}
                        onMouseEnter={() => {
                          try {
                            playHover();
                          } catch (e) {}
                        }}
                        onClick={() => handleSelectRace(race)}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="card-header">
                          <span className="round-num">RONDA {race.round}</span>
                          {isNext && (
                            <div className="badge next">
                              <span className="material-icons">flag</span>
                              PRÓXIMA
                            </div>
                          )}
                          {race.type === "sprint" && (
                            <div className="badge sprint">
                              <span className="material-icons">bolt</span>
                              SPRINT
                            </div>
                          )}
                        </div>
                        <div className="race-name">{race.name}</div>
                        <div className="card-info">
                          <span className="material-icons">place</span>
                          <span>{race.location}</span>
                        </div>
                        <div className="circuit-name">{race.circuit}</div>
                        {isNext && (
                          <div className="days-remain">
                            <span className="material-icons">timer</span>
                            {days} días restantes
                          </div>
                        )}
                      </motion.div>
                    </Tilt>
                  );
                })}
                {filteredRaces.length === 0 && (
                  <div
                    style={{
                      color: "#999",
                      textAlign: "center",
                      padding: "2rem",
                    }}
                  >
                    No se encontraron carreras.
                  </div>
                )}
              </motion.div>
            </section>

            {/* Right Panel: Details */}
            <section className="right-panel">
              <AnimatePresence mode="wait">
                {selectedRace ? (
                  <motion.div
                    key={selectedRace.round}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative mb-6">
                      <h2 className="detail-name">{selectedRace.name}</h2>
                      <div className="detail-location-row">
                        <span className="material-icons">place</span>
                        <span>{selectedRace.location}</span>
                      </div>
                      <div className="detail-circuit">
                        {selectedRace.circuit}
                      </div>
                      <span className="material-icons watermark-icon">map</span>
                    </div>
                    <div className="sessions-area">
                      <div className="panel-header">
                        <span className="material-icons">calendar_month</span>
                        <h3>HORARIOS DE SESIÓN</h3>
                      </div>
                      <motion.div
                        className="sessions-block"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                      >
                        {getFormattedSessions(selectedRace).map(
                          (session, idx) => (
                            <motion.div
                              key={idx}
                              variants={itemVariants}
                              className="session-item"
                            >
                              <div className="session-icon">
                                <span className="material-icons">
                                  {session.icon}
                                </span>
                              </div>
                              <div className="session-info">
                                <div className="session-name">
                                  {session.name}
                                </div>
                                <div className="session-date">
                                  {session.date}
                                </div>
                              </div>
                              <div className="session-time-box">
                                <span className="material-icons">schedule</span>
                                {session.time}
                              </div>
                            </motion.div>
                          )
                        )}
                      </motion.div>
                    </div>

                    {nextRace && nextRace.round === selectedRace.round && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="countdown-container active"
                      >
                        <div className="countdown-header">
                          <span className="material-icons">timer</span>
                          <span>CUENTA ATRÁS</span>
                        </div>
                        <div className="countdown-body">
                          <div className="countdown-value">{daysUntilNext}</div>
                          <div className="countdown-unit">DÍAS</div>
                        </div>
                        <div className="countdown-footer">
                          PARA EL GRAN PREMIO
                        </div>
                      </motion.div>
                    )}

                    <button
                      className="remind-btn"
                      onClick={() => {
                        const promise = () =>
                          new Promise((resolve) => setTimeout(resolve, 800));
                        toast.promise(promise, {
                          loading: "Activando recordatorio...",
                          success: `¡Recordatorio activado!`,
                          error: "Error",
                          description: `Te avisaremos para el ${selectedRace.name} `,
                        });
                        try {
                          playClick();
                        } catch (e) {}
                      }}
                    >
                      <span className="material-icons">
                        notifications_active
                      </span>
                      Notificarme
                    </button>
                  </motion.div>
                ) : (
                  <div style={{ color: "var(--text-sec)", padding: "1.5rem" }}>
                    Selecciona una carrera
                  </div>
                )}
              </AnimatePresence>
            </section>
          </main>

          {/* Footer */}
          <footer className="main-footer">
            <div className="footer-content">
              <div className="footer-logo">
                <span className="material-icons">sports_motorsports</span>
                <span>F1 2026</span>
              </div>
              <div className="footer-links">
                <a href="#">Política de Privacidad</a>
                <a href="#">Términos de Uso</a>
                <a href="#">Contacto</a>
              </div>
              <div className="footer-copyright">
                © 2026 F1 Calendar. By Jose Alvarez Dev. Aplicación no oficial.
                F1 es una marca registrada de Formula One Licensing BV.
              </div>
            </div>
          </footer>

          <Toaster position="top-center" theme="dark" richColors />
        </motion.div>
      )}
    </>
  );
}

export default App;
