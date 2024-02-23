function AutozonersRenderProps(props) {
    const autozoners = [
      { imageSrc: "autozoner-1", name: "Jesse Vanegas" },
      { imageSrc: "autozoner-2", name: "Caleb Pryor" },
      { imageSrc: "autozoner-3", name: "Terry Collum" },
    ];
    return props.children({
      autozoners: autozoners,
    });
  }
  export default AutozonersRenderProps;