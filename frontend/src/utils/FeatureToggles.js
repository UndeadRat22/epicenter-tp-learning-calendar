class FeatureToggles {
  constructor() {
    this.url = '';
    this.features = [];
    this.fetchSuccess = false;
  }

  async init(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.features = data.features;
      this.fetchSuccess = true;
    } catch (err) {
      console.warn(`Failed to fetch feature toggles: ${err}`);
    }
  }

  isOn(name) {
    if (!this.fetchSuccess) return;

    const feature = this.features.find(x => x.name === name);

    if (!feature) {
      console.warn(`Feature toggle with name "${name}" was not found`);
      return false;
    }

    return feature.enabled;
  }
}

const singleton = new FeatureToggles();

export default singleton;
