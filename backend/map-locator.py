import overpy
from geopy.geocoders import Nominatim
import folium

# Function to geocode an address using Nominatim (OpenStreetMap)
def geocode_address(address):
    geolocator = Nominatim(user_agent="my_geocoder")
    location = geolocator.geocode(address)
    return location.latitude, location.longitude

# Function to query OpenStreetMap data using Overpass API
def query_osm_data(latitude, longitude, radius=10):
    api = overpy.Overpass()

    # Define the query to get nodes within a specific radius
    query = f"""
        node(around:{radius},{latitude},{longitude});
        out;
    """

    result = api.query(query)
    return result

# Function to create a folium map with OSM data
def create_osm_map(latitude, longitude, nodes):
    map_osm = folium.Map(location=[latitude, longitude], zoom_start=14)

    # Add markers for OSM nodes
    for node in nodes:
        folium.Marker(
            location=[node.lat, node.lon],
            popup=f"Node ID: {node.id}",
            icon=folium.Icon(color="blue"),
        ).add_to(map_osm)

    return map_osm

if __name__ == "__main__":
    # Example address to geocode
    address_to_geocode = "1600 Amphitheatre Parkway, Mountain View, CA"

    # Geocode the address to get latitude and longitude
    latitude, longitude = geocode_address(address_to_geocode)

    # Query OSM data within a specific radius of the geocoded location
    radius = 1000  # in meters
    osm_data = query_osm_data(latitude, longitude, radius)

    # Create a folium map with OSM data
    osm_map = create_osm_map(latitude, longitude, osm_data.nodes)

    # Save the map as an HTML file
    osm_map.save("osm_map.html")

