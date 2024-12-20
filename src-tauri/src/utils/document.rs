use comrak::{markdown_to_html, ComrakOptions};
use lazy_static::lazy_static;
use std::{fs::read_to_string, sync::Mutex};

lazy_static! {
    static ref FILE_PATH: Mutex<String> = Mutex::new(String::new());
}

pub fn set_file_path(path: &str) {
    *FILE_PATH.lock().unwrap() = path.to_string();
}

pub fn read_file_path() -> String {
    FILE_PATH.lock().unwrap().clone()
}

pub fn read_md_file(path: &str) -> Result<String, String> {
    match read_to_string(path) {
        Ok(content) => {
            let mut options = ComrakOptions::default();
            options.extension.strikethrough = true;
            options.extension.autolink = true;
            options.extension.table = true;
            options.extension.tasklist = true;
            options.extension.footnotes = true;
            options.extension.description_lists = true;
            options.extension.underline = true;
            options.extension.greentext = true;
            options.extension.math_code = true;
            options.extension.math_dollars = true;
            options.extension.multiline_block_quotes = true;
            options.extension.spoiler = true;
            options.extension.subscript = true;
            options.extension.superscript = true;
            options.extension.tagfilter = true;
            options.extension.underline = true;
            options.extension.wikilinks_title_after_pipe = true;
            options.extension.wikilinks_title_before_pipe = true;
            options.render.github_pre_lang = true;
            options.render.unsafe_ = true;
            options.render.tasklist_classes = true;
            Ok(markdown_to_html(&content, &options))
        }
        Err(e) => Err(e.to_string()),
    }
}
