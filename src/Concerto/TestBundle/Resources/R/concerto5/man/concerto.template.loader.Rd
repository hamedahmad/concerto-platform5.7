\examples{
response1 <- concerto.template.loader(1)
response2 <- concerto.template.loader(html="<div class=\"loading-container\">
  <div class=\"spinner\"></div>
  <p class=\"loading-text\">Wird geladen... bitte warten</p>
</div>

<style>
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #007bff;
    border-radius: 50\%;
    animation: spin 1s linear infinite;
    margin-bottom: 12px;
  }

  .loading-text {
    color: #555;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }

  @keyframes spin {
    0\% { transform: rotate(0deg); }
    100\% { transform: rotate(360deg); }
  }
</style>")
}