import React from 'react';
import { ShieldCheck, XCircle, FileText, CheckCircle2, AlertTriangle, Scale, MapPin } from 'lucide-react';

export default function Results({ result, onReset }) {
  const { isEligible, data } = result;

  const GALICIA_COMMISSIONS = [
    'A Coruña', 'Ferrol', 'Santiago de Compostela', 'Lugo', 'Ourense', 'Pontevedra', 'Vigo'
  ];

  return (
    <div className="fade-in">
      {/* 1. Veredicto del Cálculo */}
      <div className={`glass-panel mb-4 ${isEligible ? 'border-success' : 'border-danger'}`} style={{ borderColor: isEligible ? 'var(--color-success)' : 'var(--color-danger)', borderLeftWidth: '6px' }}>
        <div className="flex-between">
          <div>
            <h2 style={{ color: isEligible ? 'var(--color-success)' : 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isEligible ? <ShieldCheck size={32} /> : <XCircle size={32} />}
              {isEligible ? 'Eres Elegible (Provisionalmente)' : 'No Pareces Cumplir los Requisitos'}
            </h2>
            <p style={{ margin: 0 }}>
              {isEligible 
                ? 'Según la información facilitada y aplicando los umbrales del IPREM y Ley 1/1996, tendrías derecho a la Justicia Gratuita.' 
                : 'Tus recursos económicos superan el umbral legal, o existen signos patrimoniales excluyentes.'}
            </p>
          </div>
        </div>
      </div>

      {isEligible && (
        <div className="grid-2 delay-1 fade-in">
          {/* 2. Derechos (Art. 6 LAJG) */}
          <div className="glass-panel">
            <h3><Scale size={20} style={{ display: 'inline', marginRight: '8px' }}/> Tus Derechos (Art. 6)</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }}/>
                <span>Asesoramiento y orientación gratuitos.</span>
              </li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }}/>
                <span>Asistencia gratuita de abogado y procurador (si es preceptivo).</span>
              </li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }}/>
                <span>Exención del pago de tasas judiciales y depósitos.</span>
              </li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }}/>
                <span>Asistencia pericial gratuita aplicable.</span>
              </li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }}/>
                <span>Reducción del 80% en aranceles notariales y registrales.</span>
              </li>
            </ul>
          </div>

          {/* 3. Documentación Inteligente */}
          <div className="glass-panel">
            <h3><FileText size={20} style={{ display: 'inline', marginRight: '8px' }}/> Documentación a Preparar</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>RD 141/2021 Anexo I.I</p>
            
            <div className="alert alert-info" style={{ padding: '0.75rem' }}>
               Consentimiento: Deberás firmar la autorización para consulta tributaria telemática.
            </div>

            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li>Fotocopia de DNI, NIE o Pasaporte.</li>
              <li>Certificado de empadronamiento.</li>
              {data.ingresosBrutos > 0 && <li>Declaración de IRPF o certificado de rentas y patrimonio de la AEAT.</li>}
              {data.numMiembrosFamilia > 1 && <li>Libro de Familia o documento equivalente.</li>}
              {data.esVictimaVulnerable && <li>Acreditación de pertenencia al colectivo vulnerable (Sentencia, informe social, etc).</li>}
              {!data.excedePatrimonio && <li>Certificación catastral de bienes inmuebles.</li>}
            </ul>
          </div>
        </div>
      )}

      {/* 4. Territorialidad Galicia */}
      {isEligible && data.region === 'Galicia' && (
        <div className="glass-panel delay-2 fade-in" style={{ marginTop: '1.5rem' }}>
          <h3><MapPin size={20} style={{ display: 'inline', marginRight: '8px' }}/> Particularidades en Galicia (D. 269/2008)</h3>
          <p>Tu expediente será tramitado y resuelto por una de las <strong>7 Comisiones de Asistencia Jurídica Gratuita de Galicia</strong> correspondientes a tu partido judicial:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {GALICIA_COMMISSIONS.map(com => (
              <span key={com} className="badge badge-primary">{com}</span>
            ))}
          </div>
        </div>
      )}

      {/* 5. Procedimientos y Plazos */}
      {isEligible && (
        <div className="glass-panel delay-3 fade-in" style={{ marginTop: '1.5rem' }}>
          <h3>Roadmap del Procedimiento</h3>
          
          <div className="alert alert-warning mt-4">
            <AlertTriangle size={20} style={{ flexShrink: 0 }}/>
            <div>
              <strong>¡Aviso Importante sobre Plazos!</strong>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                La solicitud <strong>no suspende automáticamente</strong> los plazos de un proceso judicial en curso. Debes solicitar explícitamente la suspensión al Letrado de la Administración de Justicia del Juzgado.
              </p>
            </div>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <h4>1. Presentación</h4>
              <p>Entrega la solicitud y documentación en el Colegio de Abogados de tu zona o en el Juzgado decano.</p>
            </div>
            <div className="timeline-item">
              <h4>2. Designación Provisional (Plazo: 15 días)</h4>
              <p>El Colegio revisa si faltan papeles. Si todo es correcto, designan abogado y procurador provisionalmente.</p>
            </div>
            <div className="timeline-item">
              <h4>3. Resolución Definitiva (Plazo: 30 días)</h4>
              <p>La Comisión de Asistencia Jurídica Gratuita recibe el expediente y emite la resolución firme reconociendo o denegando el derecho.</p>
            </div>
            <div className="timeline-item">
              <h4>4. Silencio Administrativo</h4>
              <p>Si la Comisión no resuelve en 30 días, la decisión provisional del Colegio quedará ratificada automáticamente.</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center" style={{ marginTop: '2rem' }}>
        <button className="btn btn-outline" onClick={onReset}>
          Hacer una nueva consulta
        </button>
      </div>
    </div>
  );
}
