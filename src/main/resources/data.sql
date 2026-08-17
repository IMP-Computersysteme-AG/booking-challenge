-- Seed data for the example feature. These are the resources that can be booked.
-- Feel free to add columns or rows if your solution needs them.
INSERT INTO resources (name, category, location, capacity) VALUES
  ('Besprechungsraum Nord', 'ROOM',    'Haus 1, 2. OG',  8),
  ('Besprechungsraum Süd',  'ROOM',    'Haus 1, 2. OG',  6),
  ('Dienstwagen',           'VEHICLE', 'Tiefgarage, P4', 5),
  ('Großer Konferenzraum',  'ROOM',    'Haus 2, EG',    40),
  ('Laptop-Wagen',          'DEVICE',  'Haus 2, 1. OG', 16),
  ('Messwagen',             'VEHICLE', 'Tiefgarage, P7', 3),
  ('Schulungsraum',         'ROOM',    'Haus 2, 1. OG', 20),
  ('Ultraschallgerät',      'DEVICE',  'Haus 3, Labor',  1);
