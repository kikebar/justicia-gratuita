/**
 * Calcula si un usuario es elegible para Asistencia Jurídica Gratuita.
 * Base legal: Ley 1/1996, de 10 de enero, de Asistencia Jurídica Gratuita.
 * 
 * @param {number} ingresosBrutos - Ingresos brutos anuales de la unidad familiar.
 * @param {number} numMiembrosFamilia - Número de miembros en la unidad familiar.
 * @param {boolean} esVictimaVulnerable - Criterio A: violencia de género, terrorismo, trata, etc.
 * @param {boolean} excedePatrimonio - Criterio C: signos de riqueza u otros inmuebles.
 * @returns {boolean} True si es elegible, False en caso contrario.
 */
export function calcularElegibilidad(
  ingresosBrutos, 
  numMiembrosFamilia, 
  esVictimaVulnerable, 
  excedePatrimonio
) {
  // CRITERIO A: Derecho automático (Subjetivo) 
  // Art. 2.g) Ley 1/1996.
  if (esVictimaVulnerable) {
      return true; 
  }

  // CRITERIO C: Capacidad patrimonial
  // Denegado si hay signos evidentes de riqueza u otras propiedades relevantes.
  if (excedePatrimonio) {
      return false;
  }

  // Constante IPREM Anual 2024 (14 pagas) aprox. 8400€
  // (Este valor debe actualizarse anualmente según Ley de Presupuestos)
  const IPREM_ANUAL = 8400; 

  // CRITERIO B: Umbrales económicos
  let multiplicadorIPREM;

  if (numMiembrosFamilia === 1) {
      // No integrados en unidad familiar
      multiplicadorIPREM = 2.0; 
  } else if (numMiembrosFamilia >= 2 && numMiembrosFamilia <= 3) {
      // Unidad familiar de menos de 4 miembros
      multiplicadorIPREM = 2.5;
  } else if (numMiembrosFamilia >= 4) {
      // Unidad familiar de 4 o más miembros (o familia numerosa)
      multiplicadorIPREM = 3.0;
  } else {
      return false; // Error en parámetros
  }

  const limiteEconomico = IPREM_ANUAL * multiplicadorIPREM;

  return ingresosBrutos <= limiteEconomico;
}
