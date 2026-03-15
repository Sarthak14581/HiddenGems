mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/outdoors-v12",
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

const reviewCount = Array.isArray(listing.reviews) ? listing.reviews.length : 0;
const avgRating = reviewCount
  ? (
      listing.reviews.reduce((sum, review) => sum + review.rating, 0) /
      reviewCount
    ).toFixed(1)
  : "New";

console.log(listing.geometry.coordinates);
//  Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) // Listing.geometry.coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h5>${listing.title}</h5><p>${listing.location}, ${listing.country}</p><p>Average rating: ${reviewCount ? `${avgRating}/5` : avgRating}</p>`,
    ),
  )
  .addTo(map);
