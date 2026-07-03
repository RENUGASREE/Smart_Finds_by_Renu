export function getPlatformCta(platform: string): string {
  switch (platform) {
    case "Amazon":
      return "View on Amazon";
    case "Flipkart":
      return "View on Flipkart";
    case "Meesho":
      return "View on Meesho";
    case "Myntra":
      return "View on Myntra";
    case "Ajio":
      return "View on Ajio";
    default:
      return "View Find";
  }
}

export function getAffiliateCta(platform: string): string {
  switch (platform) {
    case "Amazon":
      return "Buy on Amazon";
    case "Flipkart":
      return "Buy on Flipkart";
    case "Meesho":
      return "Buy on Meesho";
    case "Myntra":
      return "Buy on Myntra";
    case "Ajio":
      return "Buy on Ajio";
    default:
      return "View Recommendation";
  }
}
