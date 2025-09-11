# Krishi Sakhi – AI-Powered Personal Farming Assistant

This repository contains our solution for **Smart India Hackathon 2025**, Problem Statement **SIH25074** under the theme *Agriculture, Foodtech & Rural Development*.  

**Team Name:** SegFault  
**Problem Statement Title:** AI-Powered Personal Farming Assistant for Kerala Farmers  

---

## Project Overview
**Krishi Sakhi** is a **mobile-first digital companion** designed to empower Kerala’s farmers by providing **personalized, context-aware, and accessible advisories** in Malayalam.  

Farmers can interact via **voice or text** to get tailored guidance on crop practices, weather updates, government schemes, and market trends.  

The assistant learns over time from each farmer’s history, ensuring **improved recommendations every season**.

---

## Key Features
- Farmer & farm profiling (crop, soil, location, practices)  
- Activity tracking (sowing, spraying, irrigation, pest management)  
- Voice/Text interaction in **Malayalam** for accessibility  
- AI + weather + local agri knowledge for **personalized advisories**  
- Reminders & alerts for crop operations, scheme deadlines, and market prices  
- AI learning loop to improve guidance season after season  

---

## Technology Stack

### Frontend (Mobile App)
- **React Native / Flutter** → Cross-platform mobile-first app with farmer-friendly, bilingual UI (Malayalam + English).  
- Offline-first design to handle **low-connectivity rural areas**.  

### Backend & APIs
- **Node.js + Express** or **Python FastAPI / Django** → Handles advisory logic, user requests, and scheduling tasks.  
- REST APIs for integration with AI modules and external datasets.  

### Database
- **MongoDB / PostgreSQL** → Stores farmer profiles, farm activity logs, advisory history, and system configurations.  

### AI & Natural Language Processing (NLP)
- **Speech-to-Text (STT):** Google Cloud Speech-to-Text / Vosk (for Malayalam voice input).  
- **Translation:** Google Translate / **IndicTrans2 (AI4Bharat)** for Malayalam ↔ English translations.  
- **Intent Detection & Dialogue:** spaCy / Rasa / HuggingFace Transformers for understanding farmer queries.  

### External Data Sources
- **Weather:** OpenWeather API & IMD datasets.  
- **Crop Calendars & Pest Data:** ICAR (Indian Council of Agricultural Research).  
- **Market Prices:** Agmarknet (Agricultural Marketing Information Network).  
- **Government Schemes & Data:** data.gov.in portal.  

### Notifications & Alerts
- **Firebase Cloud Messaging** for in-app push notifications.  
- **Twilio / SMS Gateway** for text alerts to farmers without smartphones.  

### Cloud & Deployment
- **Modular microservices architecture** for scalability.  
- Deployment on **cloud infrastructure (AWS / GCP / Azure)** with containerization (Docker + Kubernetes).  

---

## Feasibility & Adoption
- Farmers already use smartphones → accessible through **voice-first interface**.  
- Open datasets & free APIs reduce initial costs.  
- Malayalam support ensures **digital inclusion**.  
- Scalable architecture allows **regional pilot → state-wide rollout**.  

---

## Impact
- Improves crop yield & income with **timely, personalized advisories**  
- Reduces fertilizer/pesticide misuse → **eco-friendly farming**  
- Increases farmer awareness of **government schemes & subsidies**  
- Promotes **climate-smart agriculture** using weather + AI insights  

---

## References & Data Sources
- [Government of India Open Data Portal](https://data.gov.in) – Crop, soil, irrigation datasets  
- [Agmarknet](https://agmarknet.gov.in) – Market prices & arrivals  
- [ICAR](https://icar.org.in) – Crop calendars, pest & disease data  
- [IMD](https://mausam.imd.gov.in) – Weather & rainfall data  
- [OpenWeather API](https://openweathermap.org/api) – Weather forecasts  
- [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text) – Malayalam voice input  
- [AI4Bharat – IndicTrans2](https://ai4bharat.iitm.ac.in) – Indian language NLP models  

---

## Team SegFault
Smart India Hackathon 2025 Participants  

---
