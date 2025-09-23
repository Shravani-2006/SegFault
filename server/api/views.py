from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# New line: Import the new library
from deep_translator import GoogleTranslator

@api_view(['POST'])
def round_trip_translate(request):
    """
    Receives Malayalam text, translates to English, then translates back to Malayalam.
    """
    message = request.data.get('message', None)

    if not message:
        return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # --- STEP 1: Translate from Malayalam to English (for the AI) ---
        print(f'Received Malayalam: "{message}"')
        # New line: Use the new translator syntax
        english_for_ai = GoogleTranslator(source='ml', target='en').translate(message)
        print(f'Translated to English for AI: "{english_for_ai}"')

        # --- STEP 2: AI PROCESSING (FUTURE STEP) ---
        english_from_ai = english_for_ai

        # --- STEP 3: Translate the response from English back to Malayalam ---
        print(f'Simulating AI Response in English: "{english_from_ai}"')
        # New line: Use the new translator syntax again
        final_malayalam_response = GoogleTranslator(source='en', target='ml').translate(english_from_ai)
        print(f'Translated back to Malayalam for user: "{final_malayalam_response}"')

        # MODIFIED LINE: Return both the intermediate and final translations
        return Response({'english_intermediate': english_for_ai, 'final_translation': final_malayalam_response})

    except Exception as e:
        print(f"Translation error: {e}")
        return Response({'error': 'Failed to process translation.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

