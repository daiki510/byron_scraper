export default {
  "appenders": {
    "console": {
      "type": "console"
    },
    "system": {
      "type": "dateFile",
      "filename": "storage/log/system.log",
      "pattern": "-yyyy-MM-dd"
    },
    "error": {
      "type": "dateFile",
      "filename": "storage/log/error.log",
      "pattern": "-yyyy-MM-dd"
    }
  },
  "categories": {
    "default": {
      "appenders": [
        "console",
        "system"
      ],
      "level": "all"
    },
    "error": {
      "appenders": [
        "console",
        "error"
      ],
      "level": "warn"
    }
  }
}