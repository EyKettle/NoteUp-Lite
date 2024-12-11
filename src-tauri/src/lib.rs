use std::fs::metadata;

use tauri::{Manager, Theme};
use window_vibrancy::{apply_acrylic, apply_mica};

mod utils;
use utils::document::read_md_file;

#[tauri::command]
fn read_file(path: &str) -> String {
    read_md_file(path).unwrap_or("".to_string())
}

#[tauri::command]
fn file_exists(path: &str) -> bool {
    match metadata(path) {
        Ok(metadata) => metadata.is_file(),
        Err(_) => false,
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            let dark = { window.theme().unwrap() == Theme::Dark };
            match apply_mica(&window, Some(dark)) {
                Ok(_) => println!("[Window] Applied Mica."),
                Err(_) => {
                    if apply_acrylic(
                        &window,
                        if dark {
                            Some((32, 32, 32, 200))
                        } else {
                            Some((210, 210, 210, 200))
                        },
                    ).is_ok() {
                        println!("[Window] Applied Acrylic.")
                    }
                }
            }
            window.show().expect("Initialized failed because of show window failed.");
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![read_file, file_exists])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
