from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

BOT_TOKEN = "ТОКЕН_ТВОЕГО_БОТА"
ADMIN_CHAT_ID = "123456789"  # твой chat_id

def send_to_telegram(text):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    requests.post(url, json={"chat_id": ADMIN_CHAT_ID, "text": text, "parse_mode": "HTML"})

@app.route("/send_appointment", methods=["POST"])
def send_appointment():
    d = request.get_json()
    msg = (
        f"🧾 <b>Новая запись на приём</b>\n"
        f"👤 Имя: {d.get('name')}\n"
        f"📞 Телефон: {d.get('phone')}\n"
        f"✉️ Email: {d.get('email') or '—'}\n"
        f"📅 Дата: {d.get('date')}\n"
        f"⏰ Время: {d.get('time')}\n"
        f"💬 Комментарий: {d.get('message') or '—'}"
    )
    send_to_telegram(msg)
    return jsonify({"status": "ok"})

@app.route("/send_feedback", methods=["POST"])
def send_feedback():
    d = request.get_json()
    msg = (
        f"⭐ <b>Новый отзыв</b>\n"
        f"👤 Имя: {d.get('name')}\n"
        f"💬 Отзыв: {d.get('message')}"
    )
    send_to_telegram(msg)
    return jsonify({"status": "ok"})

@app.route("/send_question", methods=["POST"])
def send_question():
    d = request.get_json()
    msg = (
        f"❓ <b>Новый вопрос (FAQ)</b>\n"
        f"👤 Имя: {d.get('name')}\n"
        f"📞 Телефон: {d.get('phone')}\n"
        f"💬 Вопрос: {d.get('question')}"
    )
    send_to_telegram(msg)
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
