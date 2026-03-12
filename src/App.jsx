import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';

function App() {
  const [result, setResult] = useState(null);

  const handleComplete = (evaluation) => {
    setResult(evaluation);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <header className="text-center mb-4 fade-in">
          <h1 style={{ marginBottom: '0.25rem', marginTop: '2rem' }}>
            Guía de Acceso a la <span style={{ color: 'var(--color-accent)' }}>Justicia Gratuita</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Averigua si cumples los requisitos legales para obtener un abogado de oficio y exenciones de tasas en España (Ley 1/1996).
          </p>
        </header>

        <main style={{ marginTop: '3rem' }}>
          {!result ? (
            <Questionnaire onComplete={handleComplete} />
          ) : (
            <Results result={result} onReset={handleReset} />
          )}
        </main>
      </div>
      
      <footer style={{ background: 'var(--color-primary-light)', padding: '2rem', color: 'white', textAlign: 'center' }}>
         <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
           <strong>Aviso Legal:</strong> Esta aplicación tiene un carácter puramente orientativo y no constituye asesoramiento legal vinculante. 
           Basado en la Ley 1/1996, RD 141/2021 y condicionantes autonómicos.
         </p>
      </footer>
    </div>
  );
}

export default App;
