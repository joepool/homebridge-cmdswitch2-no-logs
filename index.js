const { API } = require('homebridge');

module.exports = (api) => {
  api.registerAccessory('ExampleAccessory', ExampleAccessory);
};

class ExampleAccessory {
  constructor(log, config, api) {
    this.log = log;
    this.config = config;
    this.api = api;

    this.name = config.name;

    const { Service, Characteristic } = this.api.hap;

    // Använd api.hap istället för Characteristic direkt
    this.service = new Service.Switch(this.name);

    this.service
      .getCharacteristic(Characteristic.On)
      .onSet(this.handleSetOn.bind(this)) // Nyare syntax för att hantera set-funktioner
      .onGet(this.handleGetOn.bind(this)); // Nyare syntax för att hantera get-funktioner

    this.informationService = new Service.AccessoryInformation()
      .setCharacteristic(Characteristic.Manufacturer, 'Example Manufacturer')
      .setCharacteristic(Characteristic.Model, 'Example Model')
      .setCharacteristic(Characteristic.SerialNumber, '123-456-789');
  }

  // Hanterar "Set" för switchens On-tillstånd
  async handleSetOn(value) {
    this.log(`Setting switch to ${value}`);
    // Lägg till din logik för att ändra switchens tillstånd här
    this.switchOn = value;
  }

  // Hanterar "Get" för switchens On-tillstånd
  async handleGetOn() {
    this.log(`Getting switch state: ${this.switchOn}`);
    // Returnera det aktuella tillståndet
    return this.switchOn || false;
  }

  getServices() {
    return [this.informationService, this.service];
  }
}
