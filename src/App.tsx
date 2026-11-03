
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

type Memory = {
  title: string;
  text: string;
  image: string;
};

const memories: Memory[] = [
  {
    title: "El comienzo",
    text: "Ese lugar donde nuestros caminos se cruzaron. Aquí empieza uno de mis recuerdos favoritos.",
    image: "/images/recuerdo-1.jpg",
  },
  {
    title: "Momentos que guardo",
    text: "Esos instantes que quizá parecían pequeños, pero que hoy tienen un lugar especial para mí.",
    image: "/images/recuerdo-2.jpg",
  },
  {
    title: "Y aquí seguimos...",
    text: "No todo ha sido sencillo. Pero quiero que sepas que me sigues importando y que me gustaría seguir conociéndote.",
    image: "/images/recuerdo-3.jpg",
  },
  {
    title: "Un recuerdo más",
    text: "Porque hay momentos que quisiera guardar para siempre, y tú formas parte de ellos.",
    image: "/images/recuerdo-4.jpg",
  },
];

export default function App() {
  const [letterOpen, setLetterOpen] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const memoryCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Un lugar para nosotros ✦";
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      console.error("No se pudo reproducir la música:", error);
      setMusicPlaying(false);
    }
  }

  async function downloadMemory() {
    if (!memoryCardRef.current || downloading) return;

    setDownloading(true);

    try {
      const canvas = await html2canvas(memoryCardRef.current, {
        backgroundColor: "#21162b",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      link.download = "nuestro-primer-recuerdo.png";
      link.href = image;
      link.click();
    } catch (error) {
      console.error("Error al crear el recuerdo:", error);
      alert("No se pudo guardar la imagen. Inténtalo nuevamente.");
    } finally {
      setDownloading(false);
    }
  }

  function saveOurMoment() {
    setAnswer(false);
    setShowMemory(true);
  }

  return (
    <main>
      {/* Música de fondo */}
      <audio
        ref={audioRef}
        src="/audio/nuestra-cancion.mp3"
        loop
        preload="auto"
        onPause={() => setMusicPlaying(false)}
        onPlay={() => setMusicPlaying(true)}
      />

      <button
        className="music-button"
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Pausar música" : "Reproducir música"}
      >
        <span>{musicPlaying ? "♫" : "♪"}</span>
        {musicPlaying ? "Pausar música" : "Nuestra canción"}
      </button>

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* INICIO */}
      <section className="hero" id="inicio">
        <div className="hero-content">
          <span className="eyebrow">
            <i /> Una pequeña sorpresa para ti <i />
          </span>

          <h1>
            Hay historias
            <br />
            <em>que merecen</em>
            <br />
            un lugar especial.
          </h1>

          <p className="hero-copy">
            Y esta es una de ellas. Preparé algo para ti, Mari.
            No tienes que hacer nada más que dejarte llevar
            y descubrirlo poquito a poquito.
          </p>

          <a className="button button-primary" href="#historia">
            Descubrir nuestra historia <span>✧</span>
          </a>

          <p className="tiny-note">
            Hecho con cariño, especialmente para ti.
          </p>
        </div>

        <a className="scroll-cue" href="#historia">
          DESLIZA PARA COMENZAR <span>↓</span>
        </a>
      </section>

      {/* HISTORIA Y FOTOGRAFÍAS */}
      <section className="section memories-section" id="historia">
        <div className="section-heading">
          <span className="eyebrow">CAPÍTULO UNO</span>

          <h2>
            Y pensar que todo
            <br />
            <em>comenzó en el trabajo...</em>
          </h2>

          <p>
            A veces la vida cruza nuestros caminos en los lugares
            más inesperados. Entre días normales, conversaciones
            y momentos que quizá al principio parecían pequeños,
            empezó a formarse algo que hoy quiero recordar.
          </p>
        </div>

        <div className="timeline">
          {memories.map((memory, index) => (
            <motion.article
              className="memory"
              key={memory.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <span className="timeline-dot" />

              <div className="memory-card">
                <span className="memory-number">
                  RECUERDO 0{index + 1}
                </span>

                <h3>{memory.title}</h3>

                <p>{memory.text}</p>

                <div className="photo-frame">
                  <img
                    src={memory.image}
                    alt={`Recuerdo ${index + 1} con Mari`}
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CARTA */}
      <section className="section letter-section" id="carta">
        <div className="letter-intro">
          <span className="eyebrow">CAPÍTULO DOS</span>

          <h2>
            Hay algo que
            <br />
            <em>quiero decirte...</em>
          </h2>

          <p>
            Preparé unas palabras para ti. Abre el sobre cuando estés lista.
          </p>

          <button
            className={`envelope ${letterOpen ? "is-open" : ""}`}
            onClick={() => setLetterOpen(true)}
            aria-label="Abrir la carta"
          >
            <span className="envelope-back" />
            <span className="envelope-flap" />
            <span className="envelope-front" />
            <span className="wax-seal">♥</span>
          </button>

          <small className="envelope-help">
            {letterOpen
              ? "Una carta escrita especialmente para ti ♡"
              : "Toca el sobre para abrirlo"}
          </small>
        </div>

        <AnimatePresence>
          {letterOpen && (
            <motion.article
              className="letter-paper"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow">PARA MARI, CON CARIÑO</span>

              <h3>Quiero que sepas algo...</h3>

              <p>
                Desde que nos conocimos en el trabajo, hemos compartido
                momentos que hoy tienen un lugar especial para mí.
                Sé que no todo ha sido fácil y que hemos pasado por
                momentos difíciles, pero aun así quiero que sepas
                que me interesas de verdad.
              </p>

              <p>
                Me gusta compartir tiempo contigo, conocerte cada día
                un poquito más y pensar en todos esos momentos bonitos
                que todavía podríamos vivir. No hice esto porque todo
                tenga que ser perfecto, sino porque tú eres alguien
                a quien quiero demostrarle lo que siento.
              </p>

              <p>
                Gracias por formar parte de mi historia. Ojalá este
                pequeño detalle te saque una sonrisa y se convierta
                en un recuerdo bonito para los dos.
              </p>

              <p className="signature">Con mucho cariño. ♡</p>
            </motion.article>
          )}
        </AnimatePresence>
      </section>

      {/* FUTURO */}
      <section className="section future-section">
        <div className="section-heading">
          <span className="eyebrow">CAPÍTULO TRES</span>

          <h2>
            Lo bonito todavía
            <br />
            <em>está por venir.</em>
          </h2>

          <p>
            No sé exactamente qué nos espera, pero sí sé que hay
            cosas que me gustaría compartir contigo.
          </p>
        </div>

        <div className="wishes">
          <article>
            <span>☾</span>
            <h3>Más momentos</h3>
            <p>
              Seguir creando recuerdos, incluso en los días más sencillos.
            </p>
          </article>

          <article>
            <span>⌁</span>
            <h3>Nuevos lugares</h3>
            <p>
              Descubrir sitios, vivir aventuras y tener historias que contar.
            </p>
          </article>

          <article>
            <span>✧</span>
            <h3>Elegirnos cada día</h3>
            <p>
              Conocernos más, cuidarnos y construir algo bonito sin prisas.
            </p>
          </article>
        </div>
      </section>

      {/* PROPUESTA */}
      <section className="proposal" id="pregunta">
        <div className="proposal-inner">
          <span className="eyebrow">
            Y AHORA... LO MÁS IMPORTANTE
          </span>

          <div className="star-large">✧</div>

          <h2>
            Mari, ¿me permitirías
            <br />
            <em>escribir contigo</em>
            <br />
            el siguiente capítulo?
          </h2>

          <p>
            No te prometo una historia perfecta. Quiero ofrecerte
            algo sincero: mis ganas de conocerte más, cuidarte,
            compartir momentos y construir algo bonito contigo.
          </p>

          <h2 className="question">
            ¿Quieres ser mi novia? <span>♡</span>
          </h2>

          <div className="proposal-actions">
            <button
              className="button button-primary"
              onClick={() => setAnswer(true)}
            >
              Sí, quiero ♡
            </button>

            <button
              className="button button-quiet"
              onClick={() => setShowToast(true)}
            >
              Quiero pensarlo
            </button>
          </div>

          <div className={`toast ${showToast ? "visible" : ""}`}>
            Tómate tu tiempo. Lo importante es que te sientas cómoda. ♡
          </div>
        </div>
      </section>

      {/* RESPUESTA AFIRMATIVA */}
      <AnimatePresence>
        {answer && (
          <motion.div
            className="answer-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="answer-content"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="heart-beat">💗</div>

              <span className="eyebrow">UN NUEVO COMIENZO</span>

              <h2>Entonces, que empiece algo bonito.</h2>

              <p>
                Gracias por recibir este cariño. Me hace mucha ilusión
                lo que podemos construir juntos.
              </p>

              <button
                className="button button-primary"
                onClick={saveOurMoment}
              >
                Guardar este momento ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RECUERDO DESCARGABLE */}
      <AnimatePresence>
        {showMemory && (
          <motion.div
            className="memory-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="memory-content"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="eyebrow">
                UN RECUERDO PARA SIEMPRE
              </span>

              <h2>Y así comienza nuestra historia... ♡</h2>

              {/* Esta tarjeta se convierte en imagen PNG */}
              <div
                className="memory-souvenir"
                ref={memoryCardRef}
              >
                <span className="souvenir-star">✧</span>

                <p className="souvenir-label">
                  UN LUGAR PARA NOSOTROS
                </p>

                <h3>Un nuevo comienzo</h3>

                <div className="souvenir-heart">♡</div>

                <p className="souvenir-names">
                  MariCELI <span>&</span> Fernando
                </p>

                <div className="souvenir-divider" />

                <p className="souvenir-message">
                  No sé qué nos espera, pero me hace feliz
                  poder comenzar a escribir esta historia contigo.
                </p>

                <p className="souvenir-date">
                  {new Date().toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <span className="souvenir-footer">
                  NUESTRO PRIMER RECUERDO ♡
                </span>
              </div>

              <p className="memory-description">
                Hay momentos que merecen quedarse para siempre.
                Este es uno de ellos.
              </p>

              <button
                className="button button-primary"
                onClick={downloadMemory}
                disabled={downloading}
              >
                {downloading
                  ? "Preparando tu recuerdo..."
                  : "↓ Descargar nuestro recuerdo"}
              </button>

              <button
                className="memory-close"
                onClick={() => setShowMemory(false)}
              >
                Volver a nuestra historia
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PIE DE PÁGINA */}
      <footer>
        Hecho con cariño para Mari · Una historia que merece ser recordada
        <span>♡</span>
      </footer>
    </main>
  );
}
