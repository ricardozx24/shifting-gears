function withData(maxAutozonersToShow) {
    return function (Component) {
      const autozoners = [
        { imageSrc: "autozoner-1", name: "Jesse Vanegas" },
        { imageSrc: "autozoner-2", name: "Caleb Pryor" },
        { imageSrc: "autozoner-3", name: "Terry Collum" },
      ];
  
      return function () {
        const limitAutozoners = autozoners.slice(0, maxAutozonersToShow);
        return <Component autozoners={limitAutozoners}></Component>;
      };
    };
  }
  
  export default withData;