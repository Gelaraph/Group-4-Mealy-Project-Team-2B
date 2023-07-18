import React, { useEffect } from "react";

const MapComponent = () => {
  useEffect(() => {
    // Check if the Google Maps API is available
    if (
      typeof window.google !== "undefined" &&
      typeof window.google.maps !== "undefined"
    ) {
      // Get the user's current position
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          // Create a new map URL with the user's coordinates
          const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;

          // Set the source URL of the iframe dynamically
          const iframe = document.getElementById("google-map");
          if (iframe) {
            iframe.src = mapUrl;
          }

          // Place an icon on the map at the user's location
          // const marker = new window.google.maps.Marker({
          //   position: { lat: latitude, lng: longitude },
          //   map: new window.google.maps.Map(iframe),
          //   title: "Your Location",
          // });
        });
      }
    }
  }, []);

  return (
    <div className="google-map-div flex">
      <iframe
        className="google-map"
        title="google map"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=abuja,%20nigeria+(Mealy%20App)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      />
    </div>
  );
};

export default MapComponent;
