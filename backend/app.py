import os
import psycopg2
from flask import Flask, jsonify, request

app = Flask(__name__)


def get_connection():
    return psycopg2.connect(
        host="database",
        database=os.getenv("POSTGRES_DB"),
        user=os.getenv("POSTGRES_USER"),
        password=os.getenv("POSTGRES_PASSWORD")
    )


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT id, title FROM tasks ORDER BY id")
    tasks = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify([
        {"id": task[0], "title": task[1]}
        for task in tasks
    ])


@app.route("/api/tasks", methods=["POST"])
def add_task():
    title = request.json.get("title", "").strip()

    if not title:
        return jsonify({"error": "Empty task"}), 400

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO tasks (title) VALUES (%s)",
        (title,)
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"status": "added"}), 201


@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"status": "deleted"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
