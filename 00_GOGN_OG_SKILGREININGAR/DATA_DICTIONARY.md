# Gagnaskilgreiningar og Dálkayfirlit (Data Dictionary)

Þetta skjal inniheldur hlutlausar, tæknilegar lýsingar á öllum töflum, dálkum, gagnatögum og tengslum í tölvuleikjagagnapakkanum.

---

## 1. Aðaltöflur (Main Datasets)

### `games_master_dataset.csv` & `games_master_dataset.json`
Aðaltafla gagnapakkans með **13.603 leikjum** yfir **14 leikjavélar**.

| Dálkur | Gagnatag | Lýsing | Dæmi |
| :--- | :--- | :--- | :--- |
| `game_id` | String | Einstakt auðkenni leiks (slug byggt á kerfi og heiti) | `snes_super-mario-world` |
| `title` | String | Opinber titill leiksins | `Super Mario World` |
| `platform_key` | String | Kerfiskóði leikjavélar | `snes`, `megadrive`, `arcade` |
| `platform_name` | String | Fullt heiti leikjavélar | `Super Nintendo Entertainment System (SNES)` |
| `platform_short` | String | Stytt heiti leikjavélar | `SNES`, `NES`, `N64` |
| `platform_company` | String | Framleiðandi / Eigandi vélbúnaðar | `Nintendo`, `Sega`, `SNK` |
| `platform_generation` | String | Kynslóð leikjavélar | `4th Generation (16-bit)` |
| `release_date` | String | Útgáfudagsetning á ISO sniði (YYYY-MM-DD) eða YYYY | `1990-11-21` |
| `release_year` | Integer | Útgáfuár | `1990` |
| `decade` | String | Áratugur útgáfu | `1990s`, `1980s`, `2000s` |
| `developer` | String | Hönnuður / Framleiðslufyrirtæki leiksins | `Nintendo EAD`, `Capcom`, `Konami` |
| `publisher` | String | Útgefandi leiksins | `Nintendo`, `Sega`, `Square` |
| `genre_detailed` | String | Upprunalegur nákvæmur leikjaflokkur úr gagnagrunni | `Sports / Baseball`, `Action / Platformer` |
| `genre_category` | String | Samræmdur yfirflokkur (Normalized category) | `Platformer`, `RPG`, `Shooter`, `Fighting` |
| `players_raw` | String | Upprunalegur texti um spilarafjölda | `1-2`, `1-4`, `1` |
| `players_min` | Integer | Lágmarksfjöldi spilara samtímis | `1` |
| `players_max` | Integer | Hámarksfjöldi spilara samtímis | `2`, `4` |
| `rating_score_pct` | Integer | Gagnrýnenda-/notandaeinkunn á skalanum 0-100% | `95`, `88` |
| `rating_stars_5` | Float | Einkunn reiknuð á kvarðanum 0.00 til 5.00 stjörnur | `4.75`, `4.40` |
| `description` | String | Fullur söguþráður og leiklýsing | Textalýsing á leiknum og gangi hans |
| `rom_filename` | String | Skráarheiti leikjaskrárinnar (ROM) | `Super Mario World (USA).sfc` |
| `rom_extension` | String | Skráarending | `SFC`, `NES`, `ZIP`, `GCM`, `BIN` |
| `rom_size_mb` | Float | Stærð leikjaskrár í megabætum (MB) | `0.51`, `32.40` |
| `has_cover_image` | Boolean | Hvort kápumynd (box art) sé til staðar | `true` / `false` |
| `has_mix_image` | Boolean | Hvort samsett forsíðumynd (mix-image) sé til staðar | `true` / `false` |
| `has_screenshot` | Boolean | Hvort skjámynd úr leik (gameplay screenshot) sé til | `true` / `false` |
| `has_titlescreen` | Boolean | Hvort titilskjár (title screen) sé til | `true` / `false` |
| `has_3d_box` | Boolean | Hvort 3D kassi sé til | `true` / `false` |
| `has_backcover` | Boolean | Hvort bakhlið kápu sé til | `true` / `false` |
| `has_marquee` | Boolean | Hvort spilakassa-borði (marquee / logo) sé til | `true` / `false` |
| `has_fanart` | Boolean | Hvort bakgrunnsmynd (fanart) sé til | `true` / `false` |
| `cover_image_path` | String | Hlutfallsleg slóð á kápumynd í myndsöfnum | `covers/snes/Super Mario World (USA).png` |
| `mix_image_path` | String | Hlutfallsleg slóð á samsetta mynd | `miximages/snes/Super Mario World (USA).png` |
| `screenshot_path` | String | Hlutfallsleg slóð á skjámynd úr leik | `screenshots/snes/Super Mario World (USA).png` |
| `titlescreen_path` | String | Hlutfallsleg slóð á titilskjá | `titlescreens/snes/Super Mario World (USA).png` |
| `box3d_path` | String | Hlutfallsleg slóð á 3D kassa | `3dboxes/snes/Super Mario World (USA).png` |
| `backcover_path` | String | Hlutfallsleg slóð á bakhlið | `backcovers/snes/Super Mario World (USA).png` |
| `marquee_path` | String | Hlutfallsleg slóð á lógó/marquee | `marquees/snes/Super Mario World (USA).png` |

---

## 2. Leikjavélatafla (Consoles & Platforms Dataset)

### `consoles_platforms_dataset.csv` & `consoles_platforms_dataset.json`
Tafla yfir allar 14 leikjavélarnar í safninu ásamt sögulegum og tæknilegum eiginleikum þeirra.

| Dálkur | Gagnatag | Lýsing |
| :--- | :--- | :--- |
| `platform_key` | String | Auðkenni leikjavélar (t.d. `nes`, `snes`, `n64`, `megadrive`, `saturn`, `dreamcast`) |
| `platform_name` | String | Fullt heiti leikjavélar |
| `short_name` | String | Stytt heiti vélar |
| `company` | String | Framleiðandi vélar |
| `generation` | String | Kynslóð í leikjasögunni og bita-flokkun (8-bit, 16-bit, 32-bit, 64-bit, 128-bit) |
| `release_year` | Integer | Upprunalegt útgáfuár vélar á markað |
| `media_type` | String | Miðilsform leikja (ROM Cartridge, CD-ROM, Floppy Disk, Arcade PCB) |
| `cpu_specs` | String | Tæknilýsing á örgjörva og hljóðbúnaði vélarinnar |
| `primary_emulators` | String | Helstu hermaforrit (emulators) og kjarnar |
| `total_games_in_collection` | Integer | Heildarfjöldi leikja í safninu fyrir þessa vél |
| `total_rom_size_mb` | Float | Heildarstærð leikjaskráa í safninu í megabætum (MB) |
| `games_with_descriptions` | Integer | Fjöldi leikja sem hafa fulla textalýsingu |
| `games_with_covers` | Integer | Fjöldi leikja sem hafa kápumynd |
| `games_with_screenshots` | Integer | Fjöldi leikja sem hafa skjámynd |
| `description` | String | Almenn kynning á sögu og einkennum vélarinnar |

---

## 3. Tengitöflur og Yfirlit (Summaries)

- **`genres_and_tags_summary.csv`**: Yfirlit yfir alla leikjaflokka, heildarfjölda leikja í hverjum flokki og hlutfall af heildarsafninu.
- **`developers_and_publishers.csv`**: Yfirlit yfir alla leikjahönnuði og útgefendur ásamt leikjafjölda þeirra.
