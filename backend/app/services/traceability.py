import json
from datetime import datetime

def trace_event(event_type: str, input_payload: dict, output_payload: dict, model_version: str):
    event = {
        "timestamp": datetime.utcnow().isoformat(),
        "event_type": event_type,
        "model_version": model_version,
        "input": input_payload,
        "output": output_payload
    }
    print(json.dumps(event, ensure_ascii=False))
