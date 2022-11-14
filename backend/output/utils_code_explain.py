import openai

OpenAI_key = "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"

openai.api_key = OpenAI_key
completion = openai.Completion()

# config
temperature = 0
max_tokens = 64
top_p = 1.0
best_of = 1
frequency_penalty = 0.0
presence_penalty = 0.0
stop = ["\"\"\""]

def execute_codex(raw_code: str):
    prompt = raw_code + "\n\"\"\"\nCode Explain:\n1."

    response = completion.create(
        prompt=prompt, 
        engine="davinci",
        max_tokens=max_tokens,    
        stop=stop, 
        temperature=temperature,
        top_p=top_p,
        best_of=best_of,
    )

    answer = response.choices[0].text.strip()
    return "1. " + answer

def run(raw_code: str):
    return execute_codex(raw_code)