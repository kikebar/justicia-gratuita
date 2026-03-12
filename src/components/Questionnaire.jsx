import React, { useState } from 'react';
import { calcularElegibilidad } from '../lib/eligibility';
import { ShieldAlert, Users, PiggyBank, Briefcase, MapPin, ArrowRight, Activity } from 'lucide-react';

export default function Questionnaire({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    region: 'Nacional', // Default, can be 'Galicia'
    esVictimaVulnerable: false,
    numMiembrosFamilia: 1,
    ingresosBrutos: 0,
    excedePatrimonio: false,
  });

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEligible = calcularElegibilidad(
      Number(formData.ingresosBrutos),
      Number(formData.numMiembrosFamilia),
      formData.esVictimaVulnerable,
      formData.excedePatrimonio
    );
    onComplete({ isEligible, data: formData });
  };

  return (
    <div className="glass-panel mx-auto" style={{ maxWidth: '600px' }}>
      <div className="steps-container">
        <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
        <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
        <div className={`step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>3</div>
        <div className={`step ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>4</div>
      </div>

      <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
        {step === 1 && (
          <div className="fade-in">
            <h2>Datos Generales</h2>
            <p className="text-muted">Ley 1/1996 - Domicilio y Colectivo</p>
            
            <div className="form-group mt-4">
              <label className="form-label">
                <MapPin size={18} style={{ display: 'inline', marginRight: '8px' }}/>
                Comunidad Autónoma
              </label>
              <select 
                className="form-select"
                value={formData.region}
                onChange={(e) => setFormData({...formData, region: e.target.value})}
              >
                <option value="Nacional">Resto de España</option>
                <option value="Galicia">Galicia</option>
              </select>
              <small style={{ color: 'var(--color-primary-light)' }}>
                El D. 269/2008 aplica consideraciones territoriales específicas en Galicia.
              </small>
            </div>

            <div className="alert alert-info mt-4">
              <ShieldAlert size={20} />
              <div>
                <strong>Criterio A: Colectivos Vulnerables</strong>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Determina tu derecho automático si eres víctima de violencia de género, terrorismo, trata, menores o personas con discapacidad víctimas de abuso.
                </p>
              </div>
            </div>

            <label className={`checkbox-label ${formData.esVictimaVulnerable ? 'selected' : ''}`}>
              <input 
                type="checkbox" 
                className="checkbox-input"
                checked={formData.esVictimaVulnerable}
                onChange={(e) => setFormData({...formData, esVictimaVulnerable: e.target.checked})}
              />
              <div>
                <strong>Sí, pertenezco a uno de estos colectivos</strong>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  (Se te exigirá acreditación en el expediente)
                </div>
              </div>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <h2>Unidad Familiar</h2>
            <p className="text-muted">Para el cálculo del baremo económico (IPREM)</p>
            
            <div className="form-group mt-4">
              <label className="form-label">
                <Users size={18} style={{ display: 'inline', marginRight: '8px' }}/>
                Número de miembros en tu unidad familiar
              </label>
              <select 
                className="form-select"
                value={formData.numMiembrosFamilia}
                onChange={(e) => setFormData({...formData, numMiembrosFamilia: parseInt(e.target.value)})}
              >
                <option value={1}>1 (Sin unidad familiar)</option>
                <option value={2}>2 a 3 miembros</option>
                <option value={4}>4 o más miembros (o familia numerosa)</option>
              </select>
            </div>
            
            <div className="alert alert-warning mt-4">
              <Activity size={20} />
              <div>
                <strong>Importante</strong>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Este factor calcula automáticamente el multiplicador (x2, x2.5 o x3) sobre el Indicador Público de Renta de Efectos Múltiples (IPREM).
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in">
            <h2>Recursos Económicos</h2>
            <p className="text-muted">Criterio B de la LAJG - Ingresos Brutos</p>
            
            <div className="form-group mt-4">
              <label className="form-label">
                <Briefcase size={18} style={{ display: 'inline', marginRight: '8px' }}/>
                Ingresos brutos anuales de la unidad familiar (€)
              </label>
              <input 
                type="number" 
                className="form-input" 
                placeholder="Ej. 18500"
                required
                value={formData.ingresosBrutos || ''}
                onChange={(e) => setFormData({...formData, ingresosBrutos: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="fade-in">
            <h2>Signos de Riqueza y Patrimonio</h2>
            <p className="text-muted">Criterio C - Capacidad Patrimonial Extrínseca</p>
            
            <div className="alert alert-info mt-4">
              <PiggyBank size={20} />
              <div>
                <strong>Propiedades Inmuebles</strong>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Tener otra propiedad además de la vivienda habitual, o signos evidentes de riqueza, puede suponer la denegación del derecho según la ley.
                </p>
              </div>
            </div>

            <label className={`checkbox-label ${formData.excedePatrimonio ? 'selected' : ''}`}>
              <input 
                type="checkbox" 
                className="checkbox-input"
                checked={formData.excedePatrimonio}
                onChange={(e) => setFormData({...formData, excedePatrimonio: e.target.checked})}
              />
              <div>
                <strong>Sí, poseo otros inmuebles o signos de riqueza</strong>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  (Segunda vivienda, vehículos de alta gama, alto patrimonio financiero)
                </div>
              </div>
            </label>
          </div>
        )}

        <div className="flex-between mt-4" style={{ marginTop: '2rem' }}>
          {step > 1 ? (
            <button type="button" className="btn btn-outline" onClick={handleBack}>
              Atrás
            </button>
          ) : (
            <div></div> // empty spacer
          )}
          
          <button type="submit" className="btn btn-primary">
            {step === 4 ? 'Evaluar Elegibilidad' : 'Siguiente'}
            {step !== 4 && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
}
