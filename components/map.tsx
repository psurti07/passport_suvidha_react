"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function PassportLocator() {
  const [pincode, setPincode] = useState("");
  const [offices, setOffices] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India
  const [loading, setLoading] = useState(false);

  // Function to handle search by PIN code
  const handleSearch = async () => {
    if (pincode.length !== 6) return;
    setLoading(true);

    try {
      // Convert PIN code to lat/lng using Geocoding API
      const geocodeRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const geocodeData = await geocodeRes.json();

      if (geocodeData.status === "OK" && geocodeData.results.length > 0) {
        const location = geocodeData.results[0].geometry.location;

        // Fetch nearby passport offices using Google Places API
        const placesRes = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=10000&type=embassy&keyword=passport&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const placesData = await placesRes.json();

        if (placesData.status === "OK") {
          const officesData = placesData.results.map((place) => ({
            name: place.name,
            address: place.vicinity,
            coordinates: place.geometry.location,
            distance: place.distance_meters ? `${(place.distance_meters / 1000).toFixed(2)} km` : "N/A",
          }));

          setOffices(officesData);
          setMapCenter(location);
        } else {
          setOffices([]);
        }
      } else {
        setOffices([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setOffices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-br from-navy/5 to-teal/5 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy mb-4">
            <span>Find Us</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading">
            Passport Office Locations
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Find your nearest passport office or acceptance facility
          </p>
        </div>

        {/* Search Box */}
        <div className="mx-auto max-w-5xl mt-16 relative">
          <Card className="rounded-3xl border-0 shadow-xl overflow-hidden relative">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-navy">Find Nearby Locations</h3>
                  <p className="text-muted-foreground">
                    Enter your PIN code to find passport offices and acceptance facilities near you.
                  </p>

                  {/* Input & Search Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      id="pincodeInput"
                      className="modern-input w-full h-12 text-lg px-4 font-medium text-navy placeholder:text-navy/40 rounded-xl"
                      maxLength={6}
                      pattern="\d{6}"
                      inputMode="numeric"
                      type="text"
                      value={pincode}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key) || e.currentTarget.value.length >= 6) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                        setPincode(value);
                      }}
                      placeholder="Enter ZIP code (6 digits)"
                      aria-label="ZIP code input"
                    />
                    <Button
                      className="bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12 px-6 flex items-center gap-2 text-base font-medium"
                      onClick={handleSearch}
                      disabled={pincode.length !== 6 || loading}
                      aria-label="Search locations"
                    >
                      {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <MapPin className="h-5 w-5" />}
                      Search Locations
                    </Button>
                  </div>

                  {/* Locations List */}
                  <div className="space-y-4" id="locationsList">
                    {offices.map((office, index) => (
                      <div key={index} className="rounded-xl border p-4 transition-all hover:border-navy hover:shadow-md bg-white cursor-pointer">
                        <h4 className="font-medium text-navy">{office.name}</h4>
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 border-navy text-navy hover:bg-navy hover:text-white rounded-full"
                          onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${office.coordinates.lat},${office.coordinates.lng}`, "_blank")}
                        >
                          <MapPin className="h-4 w-4" />
                          Directions
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="flex-1 relative min-h-[400px] md:min-h-full">
                  <iframe
                    id="locationMap"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=passport+office&center=${mapCenter.lat},${mapCenter.lng}&zoom=12`}
                    className="absolute inset-0 w-full h-full border-0 rounded-xl"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
