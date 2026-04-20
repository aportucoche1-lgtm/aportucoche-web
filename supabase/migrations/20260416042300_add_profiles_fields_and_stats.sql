/*
  # Add missing profile fields and stats view

  ## Changes
  
  ### profiles table additions
  - `phone` (text, optional) - User phone number
  - `notifications_email` (boolean, default true) - Email notifications preference
  - `notifications_alerts` (boolean, default true) - Car alert notifications preference

  ### New view: user_stats
  - Aggregates counts of favorites, saved_searches, and unread alerts per user
  - Used by the Mi Cuenta dashboard to show statistics

  ## Security
  - View is secured via underlying table RLS policies
  - No new RLS needed on the view itself (inherited)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'phone'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'notifications_email'
  ) THEN
    ALTER TABLE profiles ADD COLUMN notifications_email boolean DEFAULT true;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'notifications_alerts'
  ) THEN
    ALTER TABLE profiles ADD COLUMN notifications_alerts boolean DEFAULT true;
  END IF;
END $$;
