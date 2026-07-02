export function getPlatformCta(platform: string): string {
  switch (platform) {
    case "Amazon":
      return "View on Amazon";
    case "Flipkart":
      return "View on Flipkart";
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
    default:
      return "View Recommendation";
  }
}
