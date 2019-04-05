export class NetworkAdvice {
  public chatbotIntents: String = 'JSON file with content:\n' +
    '  "{intents": [\n' +
    '    {\n' +
    '      "tag": "greeting",\n' +
    '      "patterns": [\n' +
    '        "Hi",\n' +
    '        "How are you",\n' +
    '        "Is anyone there?",\n' +
    '        "Hello",\n' +
    '        "Good day"\n' +
    '      ],\n' +
    '      "responses": [\n' +
    '        "Hello, thanks for visiting",\n' +
    '        "Good to see you again",\n' +
    '        "Hi there, how can I help?"\n' +
    '      ],\n' +
    '      "context_set": ""\n' +
    '    },\n' +
    '    {\n' +
    '      "tag": "goodbye",\n' +
    '      "patterns": [\n' +
    '        "Bye",\n' +
    '        "See you later",\n' +
    '        "Goodbye"\n' +
    '      ],\n' +
    '      "responses": [\n' +
    '        "See you later, thanks for visiting",\n' +
    '        "Have a nice day",\n' +
    '        "Bye! Come back again soon."\n' +
    '      ]\n' +
    '    }]';


  public logsPatter: String = 'Pygrok pattern string:\n' +
    '%{IP:client} %{WORD:method} %{URIPATHPARAM:request} %{NUMBER:bytes} %{NUMBER:duration}';
  public logsData: String = 'Text file with content:\n' +
    '55.3.244.1 GET /index.html 15824 0.043\n' +
    '66.3.234.1 GET test/index.html 22824 0.011\n' +
    '66.3.222.1 GET /home.html 3212 0.01\n' +
    '66.3.211.1 GET /orders.html 2356 0.022\n' +
    '66.3.245.1 GET /secrets.html 34567 0.034\n' +
    '66.3.242.1 GET test/index.html 22824 0.98\n' +
    '66.3.230.1 GET cart/index.html 2345 0.011\n' +
    '  ...';

  public imagesStructure: String = 'Zip file with subdirectory structure:\n' +
    'image_class_directory 1\n' +
    '\t- image1\n' +
    '\t- image2\n' +
    '\t- image3\n' +
    '\t  ... \n' +
    'image_class_directory 2\n' +
    '\t- image1\n' +
    '\t- image2\n' +
    '\t- image3\n' +
    '\t  ... \n' +
    '\n' +
    'image_class_directory 3\n' +
    '\t- image1\n' +
    '\t- image2\n' +
    '\t- image3\n' +
    '\t  ... ';

}
