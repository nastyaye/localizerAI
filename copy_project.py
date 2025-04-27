# scripts/copy_project.py

import os
import shutil

def copy_project(source_path: str, region: str) -> str:
    """
    Copies the source project into localized_projects/<name>-localized-<region>/
    and bootstraps the 01_raw … 06_final subfolders.

    Args:
        source_path (str): Path to the original project folder.
        region (str): Target region name (e.g., 'Azerbaijan').

    Returns:
        str: Path to the root of the newly created localized project.
    """
    source_path = os.path.abspath(source_path)
    project_name = os.path.basename(source_path)

    # Determine project root (two levels up from this script)
    scripts_dir    = os.path.dirname(os.path.abspath(__file__))  # …/WebsiteLocaliser/scripts
    project_root   = os.path.dirname(scripts_dir)               # …/WebsiteLocaliser
    localized_dir  = os.path.join(project_root, "localized_site")
    os.makedirs(localized_dir, exist_ok=True)

    # Build localized project name & path
    region_slug    = region.lower().replace(" ", "-")
    loc_proj_name  = f"{project_name}-localized-{region_slug}"
    loc_proj_path  = os.path.join(localized_dir, loc_proj_name)

    if os.path.exists(loc_proj_path):
        raise FileExistsError(f"❌ Localized project already exists: {loc_proj_path}")

    # Create the directory structure
    os.makedirs(loc_proj_path)
    for sub in ["01_raw", "02_extracted", "03_translated", "04_images", "05_videos", "06_final"]:
        os.makedirs(os.path.join(loc_proj_path, sub), exist_ok=True)

    # Copy source into 01_raw
    raw_dest = os.path.join(loc_proj_path, "01_raw")
    shutil.copytree(source_path, raw_dest, dirs_exist_ok=True)

    print(f"✅ Project copied into structured folder:\n  {loc_proj_path}")
    return loc_proj_path


if __name__ == "__main__":
    # <<< EDIT THESE TWO LINES TO SUIT YOUR ENVIRONMENT >>>
    SOURCE_PATH = "/Users/anastassiyayegarmina/Documents/dev/WebsiteLocalizer/WebsiteLocaliserDisk/input_data"
    REGION      = "Azerbaijan"
    # <<< ---------------------------------------------- >>>

    try:
        new_path = copy_project(SOURCE_PATH, REGION)
        print(f"✅ New localized project created: {new_path}")
    except Exception as e:
        print(f"⚠️  {e}")
