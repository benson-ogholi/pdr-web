import React from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.padimanroute.app";

export const DualActionSection: React.FC = () => {
  return (
    <section className="bg-white text-purple-950 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            How Do You Want to Move?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-purple-950 mb-6 leading-tight">
            Are you a traveler or looking <br />
            <span className="text-purple-600">to send a package?</span>
          </h2>
          <p className="text-purple-900/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you have empty seats in your car or a waybill that needs to
            reach another city today, Padiman Route connects you directly with
            trusted people on the move.
          </p>
        </div>

        {/* Two Split Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Offer a Ride or Carry a Package (Traveler / Driver) */}
          <div className="bg-gradient-to-br from-purple-950 to-[#180b2e] text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-xl relative overflow-hidden border border-purple-900">
            <div className="space-y-6 relative z-10">
              <span className="inline-block bg-white/10 backdrop-blur-md text-purple-200 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/10">
                For Travelers & Drivers
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-white leading-snug">
                Traveling soon? Make your trip pay for itself.
              </h3>
              <p className="text-purple-200/80 text-base leading-relaxed">
                Got empty space in your trunk or flying with baggage allowance?
                Carry verified waybill parcels or fill your empty vehicle seats.
                Turn your upcoming interstate journey into cash.
              </p>

              {/* Contained Thumbnail Image */}
              <div className="w-full min-h-96 h-96 rounded-2xl overflow-hidden shadow-md my-4 border border-purple-500/20 group">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Traveler on interstate trip"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <ul className="space-y-3 text-sm text-purple-100 font-medium pt-2">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  Earn cash on trips you are already making
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  100% verified senders and co-passengers
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto bg-white text-purple-950 hover:bg-purple-50 font-bold py-4 px-8 rounded-xl transition shadow-lg text-center"
              >
                Offer a Ride or Carry a Package →
              </a>
            </div>
          </div>

          {/* Card 2: Send a Package or Book a Ride (Sender / Commuter) */}
          <div className="bg-[#f5f3fa] text-purple-950 rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-md border border-purple-100 relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <span className="inline-block bg-purple-200 text-purple-900 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full">
                For Senders & Commuters
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-purple-950 leading-snug">
                Need to send a waybill or book a trusted ride?
              </h3>
              <p className="text-purple-900/70 text-base leading-relaxed">
                Skip sorting center queues, warehouse delays, and high corporate
                courier rates. Send your urgent parcels directly through vetted
                travelers heading to your destination today.
              </p>

              {/* Contained Thumbnail Image */}
              <div className="w-full min-h-96 h-96 rounded-2xl overflow-hidden shadow-sm my-4 border border-purple-200 group">
                <img
                  src="https://images.unsplash.com/photo-1577702312572-5bb9328a9f15?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Secure package delivery"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <ul className="space-y-3 text-sm text-purple-900/80 font-medium pt-2">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  Same-day delivery across major Nigerian cities
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  Real-time tracking and direct traveler contact
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition shadow-sm text-center"
              >
                Send a Package or Book Ride →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualActionSection;
