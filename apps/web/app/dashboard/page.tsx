"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";
import api from '@/config/axios';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Website {
  id: string;
  url: string;
  timeAdded: string;
}

interface WebsiteTick {
  id: string;
  response_time_ms: number;
  status: string;
  region: { name: string };
  createdAt: string;
}

function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [ticks, setTicks] = useState<WebsiteTick[]>([]);
  const [loadingWebsites, setLoadingWebsites] = useState(false);
  const [loadingTicks, setLoadingTicks] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);
    setIsTokenLoaded(true);
    
    if (!storedToken) {
      router.replace("/login");
    }
  }, [router]);


  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const fetchWebsites = async () => {
    if (!token) return;
    
    try {
      setLoadingWebsites(true);
      setError(null);
      const res = await api.get('/website');
      setWebsites(res.data.websites || []);
      setSelectedWebsite(null);
      setTicks([]);
    } catch (e: any) {
      console.error('Failed to fetch websites:', e);
      setError(e.response?.data?.message || "Failed to fetch websites");
      

      if (e.response?.status === 401 || e.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoadingWebsites(false);
    }
  };

  const fetchTicks = async (websiteId: string) => {
    if (!websiteId || !token) return;

    try {
      setLoadingTicks(true);
      setError(null);
      const res = await api.get(`/status/${websiteId}`);
      
      setSelectedWebsite({
        id: res.data.id,
        url: res.data.url,
        timeAdded: res.data.timeAdded || new Date().toISOString()
      });
      
      setTicks(res.data.ticks || []);
    } catch (e: any) {
      console.error('Failed to fetch logs:', e);
      setError(e.response?.data?.message || "Failed to fetch logs");
      

      if (e.response?.status === 401 || e.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoadingTicks(false);
    }
  };

  const addWebsite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!urlInput.trim() || !token) return;

    try {
      setError(null);
      const res = await api.post('/website', { url: urlInput.trim() });
      
      if (res.data?.id) {
        setUrlInput("");
        await fetchWebsites(); 
      }
    } catch (e: any) {
      console.error('Failed to add website:', e);
      setError(e.response?.data?.message || "Failed to add website");
      

      if (e.response?.status === 401 || e.response?.status === 403) {
        handleLogout();
      }
    }
  };


  useEffect(() => {
    if (isTokenLoaded && token) {
      fetchWebsites();
    }
  }, [token, isTokenLoaded]);


  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "Up":
        return <CheckCircle className="text-green-400" size={20} />;
      case "Down":
        return <AlertTriangle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-yellow-400" size={20} />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common['Authorization'];
    setToken("");
    router.push('/login');
  };

 
  if (!isTokenLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }


  if (!token) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white font-sans px-6 py-12 relative">
      <Button
        onClick={handleLogout}
        className="fixed top-3 right-6 z-50 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 shadow-lg rounded-lg px-5 py-2.5 font-semibold transition-transform duration-200 select-none"
      >
        Logout
      </Button>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
   
        <aside className="flex flex-col gap-8">
          <form
            onSubmit={addWebsite}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg flex flex-col gap-4"
          >
            <h2 className="text-2xl font-semibold mb-2 text-green-400">
              Add Website
            </h2>
            <input
              type="url"
              placeholder="https://example.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              required
              pattern="https?://.+"
              className="p-3 rounded-lg bg-transparent border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-3 rounded-lg font-semibold hover:from-green-400 hover:to-teal-400 transition"
            >
              Add Website
            </button>
          </form>

          <section className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg max-h-[600px] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              Monitored Websites
            </h2>
            {loadingWebsites ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
                <span className="ml-3">Loading websites...</span>
              </div>
            ) : websites.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No websites added yet. Add your first website above!
              </p>
            ) : (
              <ul className="space-y-3">
                {websites.map(({ id, url, timeAdded }) => (
                  <li key={id}>
                    <button
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedWebsite?.id === id
                          ? "bg-green-500/30"
                          : "hover:bg-green-500/10"
                      }`}
                      onClick={() => fetchTicks(id)}
                    >
                      <div className="font-semibold truncate">{url}</div>
                      <div className="text-xs text-gray-400">
                        Added {new Date(timeAdded).toLocaleDateString()}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>

   
        <section className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg max-h-[700px] overflow-y-auto">
          {!selectedWebsite ? (
            <p className="text-gray-400 text-center mt-20">
              Select a website from the left sidebar to view recent logs and status.
            </p>
          ) : (
            <>
              <h2 className="text-3xl text-green-400 font-semibold mb-4 truncate">
                {selectedWebsite.url} Logs
              </h2>

              {loadingTicks ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
                  <span className="ml-3">Loading logs...</span>
                </div>
              ) : ticks.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No recent logs found for this website.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-white min-w-[600px]">
                    <thead>
                      <tr className="border-b border-green-600 text-left">
                        <th className="p-3 w-20">Status</th>
                        <th className="p-3 w-28">Response</th>
                        <th className="p-3 w-32">Region</th>
                        <th className="p-3">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ticks.map((tick) => (
                        <tr
                          key={tick.id}
                          className="border-b border-gray-700 hover:bg-green-900/10 transition-colors"
                        >
                          <td className="p-3">{renderStatusIcon(tick.status)}</td>
                          <td className="p-3">{tick.response_time_ms}ms</td>
                          <td className="p-3">{tick.region.name}</td>
                          <td className="p-3">
                            {new Date(tick.createdAt || "").toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          
          {error && (
            <div className="mt-6 p-4 bg-red-700/60 rounded-lg text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
