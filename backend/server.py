from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from FlagEmbedding import FlagReranker
from pydantic import BaseModel
from typing import List
import json
import os

# Path to your JSON file
EXAMPLE_REFERENCES_PUBMED = os.path.join(os.path.dirname(__file__), 'example_references_pubmed.json')

app = FastAPI()

# Allow CORS for all origins in development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AbstractCategorizationConfidenceInput(BaseModel):
    abstract: str
    labels: List[str]

@app.post("/abstract-categorization-confidence")
async def categorize_abstract(input: AbstractCategorizationConfidenceInput):
    abstract = input.abstract
    labels = input.labels

    # run zero shot transformer to get confidence of each label for the abstract
    classifier = pipeline("zero-shot-classification")
    response_data = classifier(
        abstract,
        candidate_labels=labels,
    )

    return {
        "data": response_data
    }

class GenericTextSummarizationInput(BaseModel):
    text: str
@app.post("/generic-text-summarization")
async def summarize_text(input: GenericTextSummarizationInput):
    text = input.text

    summarizer = pipeline("summarization", model="Falconsai/text_summarization")

    summary = summarizer(text, do_sample=False)

    return {
        "summary": summary
    }


@app.get("/pubmed-references")
async def get_pubmed_references():
    # Read the JSON file
    with open(EXAMPLE_REFERENCES_PUBMED, 'r') as file:
        example_references = json.load(file)

    return example_references

class RelatedPubmedReferencesInput(BaseModel):
    research_question: str
@app.post("/related-pubmed-references")
async def related_pubmed_references(input: RelatedPubmedReferencesInput):

    with open(EXAMPLE_REFERENCES_PUBMED, 'r') as file:
        example_references = json.load(file)

    reranker = FlagReranker('BAAI/bge-reranker-v2-m3', use_fp16=True) # Setting use_fp16 to True speeds up computation with a slight performance degradation

    related_references = []
    for reference in example_references["references"]:
        score = reranker.compute_score([input.research_question, reference["abstract"]], normalize=True)
        reference["score"] = score
        if score > 0.5: # idk what the best score should be... this is a super general reranker model
            related_references.append(reference)
            
    return related_references

# TESTING ROUTES

@app.get("/")
async def root():
    return {"data": "index test"}

@app.get("/hello-world")
async def root():
    return {"data": "Hello World"}


@app.get("/test-llm")
async def root():

    input_text =  [
        "I've been waiting for a HuggingFace course my whole life.",
        "I hate this so much!",
    ]

    classifier = pipeline("sentiment-analysis")
    llm_output = classifier(input_text)

    response_data = []

    # match input to the output
    for index, sentiment in enumerate(llm_output):
        response_data.append({
            "input": input_text[index],
            "output": sentiment
        })

    return {
        "data": response_data
    }