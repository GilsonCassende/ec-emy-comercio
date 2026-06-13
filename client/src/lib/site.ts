export const whatsappNumber = "244937770235";

export const defaultWhatsappMessage = `Olá, tudo bem?

Gostaria de receber mais informações sobre os produtos disponíveis.

Aguardo o seu atendimento.

Muito obrigado(a).`;

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppMessage(productName: string) {
  return `Olá, tudo bem?

Tenho interesse no seguinte produto da EC EMY COMÉRCIO:

• Produto: ${productName}

Gostaria de receber informações sobre:

• Disponibilidade
• Tamanhos
• Preço

Aguardo o seu atendimento.

Muito obrigado(a).`;
}

export function buildProductWhatsAppLink(productName: string) {
  return buildWhatsAppLink(buildProductWhatsAppMessage(productName));
}
